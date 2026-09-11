#!/usr/bin/env node
/**
 * TypeScript/JavaScript smoke entrypoint (FR-016).
 *
 * Drives the shared scenarios against production. Score lifecycle only: no OMR conversion, nothing
 * metered (FR-016a).
 *
 * Any account can run this, so a contributor can point it at their own. What keeps it safe is not
 * who the account belongs to but what the suite touches: everything it creates is titled
 * `smoke-test-<random>`, it deletes what it created before returning, and it reads nothing else.
 *
 * Never prints a response body, token or account identifier (FR-016d).
 */
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import process from 'node:process';

const REDACT = process.env.FLAT_SMOKE_REDACT === '1';
const redact = (s) => (REDACT ? '<redacted>' : s);

const failures = [];
const check = (name, ok, detail = '') => {
  if (ok) {
    console.log(`  ${name} ... ok`);
  } else {
    console.log(`  ${name} ... FAIL`);
    failures.push(detail ? `${name}: ${detail}` : name);
  }
};

const scenariosPath = process.argv[2];
if (!scenariosPath) {
  console.error('usage: smoke.mjs <scenarios.yaml>');
  process.exit(2);
}
const token = process.env.FLAT_TEST_TOKEN;
if (!token) {
  console.error('FLAT_TEST_TOKEN is required');
  process.exit(2);
}

// Every operation this suite calls, checked against the forbidden list rather than grepped for.
// The previous version tested the whole file for the forbidden names, which the forbidden list
// itself always matched, so the suite exited 2 on every run.
const CALLS = [
  'getAuthenticatedUser', 'createScore', 'getScore', 'editScore', 'getScoreRevisionData',
  'deleteScore', 'createCollection', 'listCollections', 'deleteCollection',
];
const raw = readFileSync(scenariosPath, 'utf8');
const forbidden = (raw.match(/^forbidden_operations:\n((?:\s*-\s*\w+\n)+)/m)?.[1] ?? '')
  .split('\n').map((l) => l.replace(/^\s*-\s*/, '').trim()).filter(Boolean);
const violation = CALLS.find((op) => forbidden.includes(op));
if (violation) {
  console.error(`refusing to run: ${violation} is metered`);
  process.exit(2);
}

const fixture = join(dirname(scenariosPath), 'fixtures', 'minimal.musicxml');

const { FlatClient, FlatNotFoundError, FlatAuthenticationError, FlatRateLimitError, FlatServerError,
        FlatAuthorizationError, TokenManager, defaultRetryPolicy, shouldRetry } =
  await import('../dist/esm/index.js');

// Through FlatClient, deliberately: it is the entry point the README and QUICKSTART document, so
// the path a new user takes is the path this suite proves.
const client = new FlatClient({ accessToken: token });

const createdScores = [];
const createdCollections = [];
const title = `smoke-test-${Math.random().toString(16).slice(2, 10)}`;

try {
  const me = await client.account.getAuthenticatedUser();
  check('whoami', Boolean(me?.id), 'no id on the authenticated user');

  const score = await client.scores.createScore({
    // No discriminator field: ScoreCreation is a union and the client picks the variant by shape,
    // ScoreCreationFileImport being the one that carries `data`.
    body: {
      title,
      privacy: 'private',
      filename: 'minimal.musicxml',
      // base64 is the only encoding the API declares.
      data: readFileSync(fixture).toString('base64'),
      dataEncoding: 'base64',
    },
  });
  // Registered before anything else can fail, so cleanup always reclaims it.
  if (score?.id) createdScores.push(score.id);
  check('create-score', createdScores.length === 1, 'no id on the created score');
  if (!createdScores.length) throw new Error('create-score returned no id');
  const scoreId = createdScores[0];

  const fetched = await client.scores.getScore({ score: scoreId });
  check('read-score', fetched?.id === scoreId, 'the score read back is not the one created');

  const renamed = `${title}-renamed`;
  const updated = await client.scores.editScore({ score: scoreId, body: { title: renamed } });
  check('update-score-metadata', updated?.title === renamed, 'the title did not change');

  const exported = await client.scores.getScoreRevisionData({ score: scoreId, revision: 'last', format: 'mxl' });
  check('export-score', Boolean(exported), 'the export returned nothing');

  // Three collections, so the traversal below has a page boundary to cross.
  for (let i = 0; i < 3; i += 1) {
    const collection = await client.collections.createCollection({
      body: { title: `${title}-collection-${i}`, privacy: 'private' },
    });
    if (collection?.id) createdCollections.push(collection.id);
  }
  check('create-collections', createdCollections.length === 3, 'could not create three collections');

  // limit: 1 forces one request per item, so the traversal cannot succeed without following the
  // cursor. An earlier version asked for a page larger than the account held, never requested a
  // second page, and proved nothing.
  const seen = [];
  for await (const item of client.paginate('listCollections', { parent: 'user', limit: 1 })) {
    seen.push(item?.id);
  }
  const missing = createdCollections.filter((id) => !seen.includes(id));
  const duplicated = seen.filter((id, i) => id && seen.indexOf(id) !== i);
  check('paginate-across-pages', seen.length > 1 && missing.length === 0 && duplicated.length === 0,
        `pages=${seen.length} missing=${missing.length} duplicated=${duplicated.length}`);

  try {
    await client.scores.getScore({ score: '000000000000000000000000' });
    check('typed-not-found', false, 'no error raised for a missing score');
  } catch (e) {
    check('typed-not-found', e instanceof FlatNotFoundError, `raised ${e?.constructor?.name}, not FlatNotFoundError`);
  }

  try {
    // A separate client, so the bad token cannot leak into the one doing the cleanup.
    await new FlatClient({ accessToken: 'invalid' }).account.getAuthenticatedUser();
    check('typed-auth-error', false, 'no error raised for an invalid token');
  } catch (e) {
    check('typed-auth-error', e instanceof FlatAuthenticationError, `raised ${e?.constructor?.name}, not FlatAuthenticationError`);
  }

  // The retry policy reaches the request path, and makes the right calls. A real throttle cannot
  // be induced without hammering production, so this asserts the wiring and the decisions.
  const wired = client.configuration.fetchApi !== undefined;
  const policy = client.retry;
  const retriesThrottle = shouldRetry(policy, new FlatRateLimitError('x', { status: 403 }), 'GET', 1);
  const retries5xx = shouldRetry(policy, new FlatServerError('x', { status: 502 }), 'GET', 1);
  // A plain 403 is a genuine authorization failure; retrying it would be worse than not retrying.
  const keeps403 = !shouldRetry(policy, new FlatAuthorizationError('x', { status: 403 }), 'GET', 1);
  // A POST may already have been applied, so it must not be replayed.
  const keepsPost = !shouldRetry(policy, new FlatServerError('x', { status: 502 }), 'POST', 1);
  check('retry-policy-applied', wired && retriesThrottle && retries5xx && keeps403 && keepsPost,
        `wired=${wired} throttle=${retriesThrottle} 5xx=${retries5xx} keeps403=${keeps403} keepsPost=${keepsPost}`);

  // An expired token refreshes on first use and is then cached. accessToken used to return the
  // stored token whatever its state, which made expiresAt dead data. No network: the helper is a stub.
  let refreshes = 0;
  const manager = new TokenManager(
    { accessToken: 'stale', refreshToken: 'r', expiresAt: Date.now() - 60_000 },
    { refresh: async () => { refreshes += 1; return { accessToken: 'refreshed', refreshToken: 'r', expiresAt: Date.now() + 3_600_000 }; } },
  );
  const first = await manager.accessToken();
  const second = await manager.accessToken();
  check('oauth-refreshes-on-expiry', first === 'refreshed' && second === 'refreshed' && refreshes === 1,
        `token=${first} refreshes=${refreshes} (expected one refresh, then cached)`);

} catch (e) {
  // The class and status, never the message: a message can quote a request body, and this runs
  // with redaction on precisely so a failure does not become a disclosure.
  const status = e?.status !== undefined ? ` status=${e.status}` : '';
  const code = e?.code !== undefined ? ` code=${e.code}` : '';
  failures.push(`unhandled ${e?.constructor?.name ?? 'Error'}${status}${code}`);
} finally {
  for (const id of createdScores) {
    try {
      await client.scores.deleteScore({ score: id });
      console.log(`  cleanup score ${redact(id)} ... deleted`);
    } catch (e) {
      failures.push(`cleanup failed for score ${redact(id)}: ${e?.constructor?.name}`);
    }
  }
  for (const id of createdCollections) {
    try {
      await client.collections.deleteCollection({ collection: id });
      console.log(`  cleanup collection ${redact(id)} ... deleted`);
    } catch (e) {
      failures.push(`cleanup failed for collection ${redact(id)}: ${e?.constructor?.name}`);
    }
  }
}

if (failures.length) {
  for (const f of failures) console.error(`  FAIL ${f}`);
  process.exit(1);
}
console.log('smoke: PASS');

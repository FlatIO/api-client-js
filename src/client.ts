/** The entry point a developer actually uses. */

import { Configuration } from './runtime.js';
import { OAuth2Helper, TokenManager, type Tokens } from './oauth.js';
import { defaultRetryPolicy, shouldRetry, delayFor, sleep, type RetryPolicy } from './retry.js';
import { fromResponse } from './errors.js';
import { paginate, type RawPage } from './pagination.js';
import { userAgentHeaders } from './userAgent.js';
import {
  AccountApi,
  ClassApi,
  CollectionApi,
  EduResourcesApi,
  GroupApi,
  OMRApi,
  OrganizationApi,
  ScoreApi,
  TaskApi,
  UserApi,
} from './apis/index.js';

export const DEFAULT_BASE_URL = 'https://api.flat.io/v2';
/** A finite default. Waiting forever is not an acceptable default for an SDK. */
export const DEFAULT_TIMEOUT_MS = 30_000;

export interface FlatClientOptions {
  accessToken?: string;
  tokens?: Tokens;
  oauth?: OAuth2Helper;
  onTokenRefresh?: (tokens: Tokens) => void | Promise<void>;
  baseUrl?: string;
  timeoutMs?: number;
  retry?: RetryPolicy;
  fetchApi?: typeof fetch;
}

export class FlatClient {
  readonly tokens: TokenManager;
  readonly retry: RetryPolicy;
  readonly baseUrl: string;
  readonly timeoutMs: number;
  readonly configuration: Configuration;

  #apis: {
    account?: AccountApi;
    classes?: ClassApi;
    collections?: CollectionApi;
    eduResources?: EduResourcesApi;
    groups?: GroupApi;
    omr?: OMRApi;
    organization?: OrganizationApi;
    scores?: ScoreApi;
    tasks?: TaskApi;
    users?: UserApi;
  } = {};

  constructor(options: FlatClientOptions) {
    const { accessToken, tokens, oauth, onTokenRefresh } = options;
    if (!accessToken && !tokens) throw new Error('pass either accessToken or tokens');

    this.tokens = new TokenManager(tokens ?? { accessToken: accessToken as string }, oauth, onTokenRefresh);
    this.retry = options.retry ?? defaultRetryPolicy;
    this.baseUrl = options.baseUrl ?? DEFAULT_BASE_URL;
    this.timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;

    this.configuration = new Configuration({
      basePath: this.baseUrl,
      headers: userAgentHeaders(),
      // The scheme is added here. The generator assigns this value straight into the
      // Authorization header with no prefix, and Flat happens to accept a bare token, but the
      // Ruby and PHP clients both send `Bearer` and a server that tightened to require the scheme
      // would break this client alone.
      //
      // Async on purpose: the manager refreshes an expired token here, and Configuration accepts a
      // function returning a Promise, so expiry is handled before a request is ever sent.
      accessToken: async () => {
        const token = await this.tokens.accessToken();
        return /^bearer /i.test(token) ? token : `Bearer ${token}`;
      },
      fetchApi: this.#retryingFetch(options.fetchApi),
    });
  }

  /**
   * Every request goes through the retry policy.
   *
   * Wrapping fetch rather than each of the generated methods: typescript-fetch has no single call
   * site to wrap, and a policy that only some operations honour is worse than none. The decision
   * needs the typed error rather than the status code, because Flat returns 403 both for rate
   * limiting and for a genuine authorization failure and only the body's `code` separates them, so
   * the error is built here. The response is still returned unchanged on the last attempt: the
   * runtime throws it, which keeps one raise site.
   */
  #retryingFetch(inner?: typeof fetch): typeof fetch {
    const base = inner ?? ((...args: Parameters<typeof fetch>) => fetch(...args));
    const policy = () => this.retry;

    return async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
      const method = (init?.method ?? 'GET').toUpperCase();
      for (let attempt = 1; ; attempt += 1) {
        let response: Response;
        try {
          // A finite timeout on every request. Without it a stalled connection hangs forever,
          // which is not an acceptable default for an SDK. A caller's own signal still aborts:
          // AbortSignal.any settles on whichever fires first.
          const timeout = AbortSignal.timeout(this.timeoutMs);
          const caller = init?.signal ?? undefined;
          const signal = caller ? AbortSignal.any([caller, timeout]) : timeout;
          response = await base(input, { ...init, signal });
        } catch (error) {
          // fetch rejects rather than resolving on a DNS or connection failure, so without this
          // the rejection escaped the loop and the retry policy never saw a transport error,
          // which is the one case it is most clearly meant to cover.
          if (!shouldRetry(policy(), error, method, attempt)) throw error;
          await sleep(delayFor(policy(), error, attempt));
          continue;
        }
        if (response.ok) return response;

        let body: unknown;
        try {
          body = await response.clone().json();
        } catch {
          body = undefined;
        }
        const headers: Record<string, string> = {};
        response.headers.forEach((value, key) => { headers[key] = value; });
        const error = fromResponse(response.status, body, headers);

        if (!shouldRetry(policy(), error, method, attempt)) return response;
        await sleep(delayFor(policy(), error, attempt));
      }
    };
  }

  /** The generated AccountApi, built on this client's configuration. */
  get account(): AccountApi {
    return (this.#apis.account ??= new AccountApi(this.configuration)) as AccountApi;
  }

  /** The generated ClassApi, built on this client's configuration. */
  get classes(): ClassApi {
    return (this.#apis.classes ??= new ClassApi(this.configuration)) as ClassApi;
  }

  /** The generated CollectionApi, built on this client's configuration. */
  get collections(): CollectionApi {
    return (this.#apis.collections ??= new CollectionApi(this.configuration)) as CollectionApi;
  }

  /** The generated EduResourcesApi, built on this client's configuration. */
  get eduResources(): EduResourcesApi {
    return (this.#apis.eduResources ??= new EduResourcesApi(this.configuration)) as EduResourcesApi;
  }

  /** The generated GroupApi, built on this client's configuration. */
  get groups(): GroupApi {
    return (this.#apis.groups ??= new GroupApi(this.configuration)) as GroupApi;
  }

  /** The generated OMRApi, built on this client's configuration. */
  get omr(): OMRApi {
    return (this.#apis.omr ??= new OMRApi(this.configuration)) as OMRApi;
  }

  /** The generated OrganizationApi, built on this client's configuration. */
  get organization(): OrganizationApi {
    return (this.#apis.organization ??= new OrganizationApi(this.configuration)) as OrganizationApi;
  }

  /** The generated ScoreApi, built on this client's configuration. */
  get scores(): ScoreApi {
    return (this.#apis.scores ??= new ScoreApi(this.configuration)) as ScoreApi;
  }

  /** The generated TaskApi, built on this client's configuration. */
  get tasks(): TaskApi {
    return (this.#apis.tasks ??= new TaskApi(this.configuration)) as TaskApi;
  }

  /** The generated UserApi, built on this client's configuration. */
  get users(): UserApi {
    return (this.#apis.users ??= new UserApi(this.configuration)) as UserApi;
  }

  /**
   * Every item across every page of a cursor-paginated operation.
   *
   *   for await (const collection of client.paginate('listCollections', { parent: 'user' })) { ... }
   *
   * The operation is named rather than passed, because the generated methods are instance methods
   * and an unbound reference loses `this`. An operation that does not paginate yields its single
   * page, so this is always safe to reach for.
   */
  paginate<T>(operation: string, params: Record<string, unknown> = {}): AsyncGenerator<T, void, undefined> {
    const method = `${operation}Raw`;
    const owner = [this.account, this.classes, this.collections, this.eduResources, this.groups, this.omr, this.organization, this.scores, this.tasks, this.users].find(
      (api) => typeof (api as unknown as Record<string, unknown>)[method] === 'function',
    );
    if (!owner) throw new Error(`no operation ${operation} on any Flat API`);

    const fetchPage = (p: Record<string, unknown>) =>
      (owner as unknown as Record<string, (q: unknown) => Promise<RawPage<T>>>)[method]!(p);
    return paginate<T, Record<string, unknown> & { next?: string }>(fetchPage, params);
  }
}

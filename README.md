# Flat API client for Typescript

Official client for the [Flat REST API](https://flat.io/developers/docs/api/), generated from Flat's
public OpenAPI specification and kept current automatically.

```sh
npm install flat-api
```

```ts
import { FlatClient } from 'flat-api';

const client = new FlatClient({ accessToken: 'YOUR_TOKEN' });
console.log((await client.account.getAuthenticatedUser()).username);
```

Get a token in seconds with a [Personal Access Token](https://flat.io/developers/apps); it works
exactly like an OAuth access token for your own account.

## What this client does for you

- **Typed errors.** Branch on the error, not the status code. Flat returns HTTP 403 for both rate
  limiting and authorization failures, so status alone cannot tell them apart.
- **Automatic retries.** Rate limits and server errors are retried with backoff. Flat sends no
  `Retry-After`, so the client reads `X-RateLimit-Reset` instead.
- **Automatic pagination.** Eight collection endpoints are cursor-paginated with the cursor in a
  `Link` header. You get an iterator; you never touch a cursor.
- **OAuth2 built in.** Authorization URLs, code exchange and transparent token refresh.
- **Full type information**, so your editor and your coding assistant both know the API.

### Pagination

```ts
for await (const collection of client.paginate('listCollections', { parent: 'user' })) {
  console.log(collection.title);
}
```

`paginate` takes the operation by name, because the generated methods are instance methods and an
unbound reference would lose `this`. It follows the cursor for you and stops at the last page.

### Errors

```ts
import { FlatRateLimitError, FlatNotFoundError } from 'flat-api';

try { /* ... */ }
catch (e) {
  if (e instanceof FlatRateLimitError) console.log('retry after', e.reset);
}
```

### Asynchronous use

Every operation returns a promise; there is one surface.

## Supported versions

Node 22 and 24, and modern browsers. Versions past their upstream end of life are not supported; see
[MIGRATION.md](MIGRATION.md) if you are on an older runtime.

## Documentation

- [Quickstart](QUICKSTART.md), install to first call
- [Per-operation reference](docs/reference/), generated
- [API documentation](https://flat.io/developers/docs/api/)
- [Migrating from 0.7.x](MIGRATION.md)

## Verifying this package

Every release carries a signed provenance attestation linking the package back to the commit, the
workflow run that built it, and the API specification version it was generated from.

```sh
npm audit signatures
npm view flat-api dist.attestations
```

Published through npm trusted publishing: no long-lived token exists that could publish under this
name.

## How this client is maintained

Generated from the public specification published at
[FlatIO/api-reference](https://github.com/FlatIO/api-reference). A new specification release
regenerates, validates and publishes this package automatically, so it never drifts from the API.

Files under `docs/reference/` and the client sources are generated: edit the generator configuration
in `tools/`, not the output.

## License

Apache 2.0. See [LICENSE](LICENSE).

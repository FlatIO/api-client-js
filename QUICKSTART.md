# Quickstart

From nothing to your first authenticated call.

## 1. Get a token

Create a [Personal Access Token](https://flat.io/developers/apps). It behaves like an OAuth access
token scoped to your own account, which is all you need to start.

## 2. Install

```sh
npm install flat-api
```

Requires Node 22 and 24, and modern browsers.

## 3. Call the API

```ts
import { FlatClient } from 'flat-api';

const client = new FlatClient({ accessToken: 'YOUR_TOKEN' });
console.log((await client.account.getAuthenticatedUser()).username);
```

If that prints your username, you are done.

## 4. Do something useful

List your collections. The client follows the cursor for you:

```ts
for await (const collection of client.paginate('listCollections', { parent: 'user' })) {
  console.log(collection.title);
}
```

Each generated API is reachable by a short name: `client.scores`, `client.collections`,
`client.classes`, `client.omr`, and so on.

## 5. Handle failure properly

```ts
import { FlatRateLimitError, FlatNotFoundError } from 'flat-api';

try { /* ... */ }
catch (e) {
  if (e instanceof FlatRateLimitError) console.log('retry after', e.reset);
}
```

Two things worth knowing about the Flat API specifically:

- Rate limiting returns **403**, not 429, and carries no `Retry-After`. The reset time is in
  `X-RateLimit-Reset`. The client already handles this; the note matters if you disable retries.
- The error `id` is only present on internal and backend errors. When you have one, quote it to
  support: it makes diagnosis much faster.

## Where next

- [README](README.md) for the full feature tour
- [Per-operation reference](docs/reference/)
- [API documentation](https://flat.io/developers/docs/api/)

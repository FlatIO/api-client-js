/**
 * Cursor pagination for the Flat API.
 *
 * Eight operations at v2.25.0 are cursor-paginated, identified by a `next` query parameter. That
 * parameter is a shared component (`#/components/parameters/next`): any tool that reads an
 * operation's parameters without resolving `$ref` under-counts them and ships collections that
 * silently truncate.
 *
 * The cursor is not in the response body. It arrives in the `Link` header, which the specification
 * does not declare, so it is parsed at runtime from the raw response.
 */

const LINK = /<([^>]+)>\s*;\s*rel="([^"]+)"/g;

/** Parse an RFC 5988 Link header into { rel: url }. */
export function parseLinkHeader(value: string | null | undefined): Record<string, string> {
  const out: Record<string, string> = {};
  if (!value) return out;
  for (const match of value.matchAll(LINK)) out[match[2]] = match[1];
  return out;
}

/**
 * Extract the opaque `next` cursor from a response's Link header, if any.
 *
 * Decoded, not captured raw. The cursor arrives percent-encoded inside the Link header's URL, and
 * the client encodes whatever it is handed when it builds the next request, so passing the encoded
 * form through sends it encoded twice and the server rejects the cursor it issued a moment ago.
 * URLSearchParams applies the same rules the server used to write it, so an opaque value
 * round-trips exactly.
 */
export function nextCursor(headers: Headers | Record<string, string> | undefined): string | undefined {
  if (!headers) return undefined;
  const link = headers instanceof Headers
    ? headers.get('link')
    : Object.entries(headers).find(([k]) => k.toLowerCase() === 'link')?.[1];
  const url = parseLinkHeader(link).next;
  if (!url) return undefined;
  try {
    return new URL(url).searchParams.get('next') ?? undefined;
  } catch {
    // A relative or malformed URL: fall back to reading the query string directly.
    const query = url.includes('?') ? url.slice(url.indexOf('?') + 1) : '';
    return new URLSearchParams(query).get('next') ?? undefined;
  }
}

export interface RawPage<T> {
  value(): Promise<T[]>;
  raw: Response;
}

/**
 * Yield every item across all pages of a cursor-paginated operation.
 *
 * `fetchPage` must be the generated `*Raw` variant, which returns the Response the cursor lives in.
 * A token expiring mid-traversal is refreshed by the client and the traversal resumes from the same
 * cursor, so no page is skipped or repeated.
 */
export async function* paginate<T, P extends { next?: string }>(
  fetchPage: (params: P) => Promise<RawPage<T>>,
  params: P,
): AsyncGenerator<T, void, undefined> {
  let cursor = params.next;
  const seen = new Set<string>();

  for (;;) {
    const page = await fetchPage({ ...params, next: cursor } as P);
    for (const item of await page.value()) yield item;

    cursor = nextCursor(page.raw.headers);
    if (!cursor) return;
    // A server that returns a cursor it already gave us would loop forever.
    if (seen.has(cursor)) return;
    seen.add(cursor);
  }
}

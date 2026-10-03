import { auth } from "@/auth";
import { ServerError } from "@/types/errors";

/**
 * Raised when the caller has no usable session: either there is none at all, or
 * the API rejected the access token.
 *
 * It cannot sign the user out by itself — `signOut()` needs `cookies()` and
 * `redirect()`, so it only works in a Server Action or Route Handler, and this
 * helper is also called from Server Components. Catch it in a Server Action and
 * call `signOutExpired()`; plain navigations are already covered by `proxy.ts`,
 * which drops the invalidated cookie and redirects to /login.
 */
export class SessionExpiredError extends ServerError {
  constructor(instance: string, detail: string) {
    super("Session expired", 401, detail, instance, "session_expired");
  }
}

export default async function WithAuthenticationFetch(
  url: string | URL | Request,
  options: RequestInit = {},
) {
  const session = await auth();
  const accessToken = session?.user?.accessToken;

  if (!accessToken) {
    throw new SessionExpiredError(
      `${url}`,
      "Requested an authenticated resource without a valid session",
    );
  }

  // `new Headers` rather than an object spread: `options.headers` may already be
  // a Headers instance, whose entries a spread would silently drop.
  const headers = new Headers(options.headers);
  headers.set("Authorization", `Bearer ${accessToken}`);

  const response = await fetch(url, { ...options, headers });

  // The `jwt` callback in auth.ts refreshes ahead of expiry, so a 401 here means
  // the token is dead and retrying on this request cannot recover it.
  if (response.status === 401) {
    throw new SessionExpiredError(`${url}`, "The API rejected the access token");
  }

  return response;
}

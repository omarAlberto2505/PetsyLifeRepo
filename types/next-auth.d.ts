import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  /** Returned by the `authorize` callback of the credentials provider. */
  interface User {
    id: string;
    email: string;
    accessToken: string;
    refreshToken: string;
    /** ISO string over the wire; the API types it as a date. */
    accessTokenExpiresAt: string | Date;
  }

  /**
   * Returned by `auth()`, `useSession()` and `getSession()`.
   *
   * NOTE: `accessToken` is reachable by the browser through `useSession()` /
   * `GET /api/auth/session`. That is required for `WithAuthenticationFetch`,
   * which reads it via `auth()`, but it does mean the bearer token leaves the
   * server. Drop it from the `session` callback if you would rather keep it
   * server-only.
   */
  interface Session {
    user: {
      id: string;
      accessToken: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  /** The encrypted session cookie payload. */
  interface JWT {
    id: string;
    email: string;
    accessToken: string;
    refreshToken: string;
    accessTokenExpiresAt: string | Date;
  }
}

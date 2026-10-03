'use server'
import { signOut } from "@/auth";

/** Ends the session on the user's own request. */
export async function logout() {
    await signOut({ redirectTo: "/login" });
}

/**
 * Ends a session the app found to be unusable — a failed token refresh or a 401
 * from the API (see `SessionExpiredError`). Only callable from a Server Action
 * or Route Handler; `signOut` uses `cookies()` and `redirect()` under the hood.
 */
export async function signOutExpired() {
    await signOut({ redirectTo: "/login?reason=session_expired" });
}

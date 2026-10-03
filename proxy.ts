import { auth } from '@/auth';
import { NextResponse } from 'next/server';
import { routes_not_behind_session_wall } from './proxy/non_session_wall';

/**
 * The `auth()` wrapper is required here rather than a bare `await auth()`:
 * only this form forwards the `Set-Cookie` headers that @auth/core emits, so a
 * session invalidated by the `jwt` callback (failed refresh) actually gets its
 * cookie deleted in the browser. Calling `await auth()` discards them and the
 * user keeps bouncing off the session wall with a dead cookie in place.
 */
export default auth((request) => {
  const session = request.auth;

  const redirection = routes_not_behind_session_wall(request, session);
  if (redirection) return redirection;

  if (!session) {
    const login = new URL('/login', request.url);
    // A session cookie on an unauthenticated request means the session was just
    // invalidated (expired refresh token), not that the user never signed in.
    if (request.cookies.getAll().some((cookie) => cookie.name.includes('authjs.session-token'))) {
      login.searchParams.set('reason', 'session_expired');
    }
    return NextResponse.redirect(login);
  }

  return;
});

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|.*\.png$).*)',
  ],

}

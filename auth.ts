import NextAuth from "next-auth";
import "./envConfig";
import Credentials from "next-auth/providers/credentials";
import { ServerError } from "./types/errors";
import type { JWT } from "next-auth/jwt";

type AuthenticatedResponse = {
  token: string;
  tokenExpiresAt: Date;
  refreshToken: string;
  refreshTokenExpiresAt: Date;
  userId: string;
  name: string;
  raisedAt: Date;
  id: string;
};

/**
 * Refresh this many milliseconds before the access token actually expires, so a
 * request in flight cannot land on the API just after it went stale.
 */
const REFRESH_SKEW_MS = 1000;

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      credentials: {
        email: {
          type: "text",
        },
        password: {
          type: "passsword",
        },
      },
      async authorize(credentials) {
        const data: AuthenticatedResponse = await fetch(
          `${process.env.NEXT_API_BASE_URL || ""}/Auth/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
          },
        )
          .then(async (response) => {
            const data = await response.json();
            if (response.ok) return data;

            throw new ServerError(
              data.title,
              data.status,
              data.detail,
              data.instance,
              data.traceId,
            );
          })

        return {
          id: data.userId,
          email: credentials.email as string,
          name: data.name,
          accessToken: data.token,
          accessTokenExpiresAt: data.tokenExpiresAt,
          refreshToken: data.refreshToken,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      // Under the `jwt` strategy the `user` argument is always undefined — the
      // session has to be built from the token.
      if (session.user) {
        session.user.id = token.id;
        session.user.accessToken = token.accessToken;
      }
      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          email: user.email,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          accessTokenExpiresAt: user.accessTokenExpiresAt,
        };
      }

      const expiresAt = new Date(token.accessTokenExpiresAt).getTime();

      if (Number.isFinite(expiresAt) && Date.now() < expiresAt - REFRESH_SKEW_MS) {
        return token;
      }

      try {
        return { ...token, ...(await refreshAccessToken(token)) };
      } catch (error) {
        console.error("Token refresh failed — clearing the session", error);
        return null;
      }
    },
  },
  session: {
    strategy: "jwt",
  },
});

async function refreshAccessToken(token: JWT) {
  let response: Response;

  try {
    response = await fetch(`${process.env.NEXT_API_BASE_URL}/Auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "RefreshToken": token.refreshToken },
    });
  } catch (error) {
    // The API is unreachable — distinct from it rejecting the refresh token.
    throw new ServerError(
      "Refresh unreachable",
      503,
      error instanceof Error ? error.message : "Could not reach the auth API",
      "/Auth/refresh",
      "refresh_unreachable",
    );
  }

  const data = await response.json();

  if (!response.ok)
    throw new ServerError(
      data.title,
      data.status,
      data.detail,
      data.instance,
      data.traceId,
    );

  // /Auth/refresh is assumed to answer with the same shape as /Auth/login
  // (`token` / `tokenExpiresAt`); the fallbacks cover an `accessToken` naming.
  return {
    accessToken: data.token ?? data.accessToken,
    refreshToken: data.refreshToken ?? token.refreshToken,
    accessTokenExpiresAt: data.tokenExpiresAt ?? data.accessTokenExpiresAt,
  };
}

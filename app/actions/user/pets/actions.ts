"use server"
import WithAuthenticationFetch from "@/config/withAuthentication"
import { CustomActionsResponseStandard } from "@/lib/useActionStateCustom"
import { ServerError } from "@/types/errors"
import { AuthError } from "next-auth"
import { isRedirectError } from "next/dist/client/components/redirect-error"

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function MyPets(): Promise<CustomActionsResponseStandard<any>> {
	try {
		const response = await WithAuthenticationFetch(
			`${process.env.NEXT_API_BASE_URL || ""}/user/pets`,
			{
				method: "GET",
			},
		)

		const data = await response.json()
		return { response: data.petsGroupedByRole }
	} catch (error) {
		if (isRedirectError(error)) {
			throw error // Rethrow it so the redirect actually happens!
		}

		if (error instanceof AuthError) {
			switch (error.type) {
				case "OAuthSignInError":
					return { response: null, error: (error as ServerError).ToJson()}
				default:
					return { response: new ServerError(
						"Authentication error",
						400,
						error.message,
						"/api/Auth/Login",
						`uncaught_error-${Date.now().toLocaleString()}`,
					).ToJson(), error: (error as ServerError).ToJson()}
			}
		}

		return { response: null, error: new ServerError(
			"Uncaught error",
			400,
			"The application was not able to sort out the error",
			"/api/Auth/Login",
			`uncaught_error-${Date.now().toLocaleString()}`,
		).ToJson()}
	}
}

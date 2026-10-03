"use server"
import WithAuthenticationFetch from "@/config/withAuthentication"
import { CustomActionsResponseStandard } from "@/lib/useActionStateCustom"
import { ServerError } from "@/types/errors"
import type { Sex } from "@/types/pets/basicInfo/BasicInfo"

export async function CatalogSexes(): Promise<
	CustomActionsResponseStandard<Sex[]>
> {
	try {
		const response = await WithAuthenticationFetch(
			`${process.env.NEXT_API_BASE_URL || ""}/pets/catalog/sexes`,
			{
				method: "GET",
			},
		)

		const sexes: { sexes: Sex[] } = await response.json()
		return { response: sexes.sexes }
	} catch (error) {
		return {
			response: null,
			error: new ServerError(
				"Uncaught error",
				400,
				"The application was not able to sort out the error",
				"/api/pets/catalog/sexes",
				`uncaught_error-${Date.now().toLocaleString()}`,
			).ToJson(),
		}
	}
}

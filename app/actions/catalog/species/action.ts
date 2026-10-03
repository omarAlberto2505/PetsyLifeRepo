"use server"
import WithAuthenticationFetch from "@/config/withAuthentication"
import { CustomActionsResponseStandard } from "@/lib/useActionStateCustom"
import { ServerError } from "@/types/errors"
import type { Species } from "@/types/pets/basicInfo/BasicInfo"

export async function CatalogSpecies(): Promise<
	CustomActionsResponseStandard<Species[]>
> {
	try {
		const response = await WithAuthenticationFetch(
			`${process.env.NEXT_API_BASE_URL || ""}/pets/catalog/species`,
			{
				method: "GET",
			},
		)

		const species: { species: Species[] } = await response.json()
		return { response: species.species }
	} catch (error) {
		return {
			response: null,
			error: new ServerError(
				"Uncaught error",
				400,
				"The application was not able to sort out the error",
				"/api/Auth/Login",
				`uncaught_error-${Date.now().toLocaleString()}`,
			).ToJson(),
		}
	}
}

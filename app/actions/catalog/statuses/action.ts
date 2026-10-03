"use server"
import WithAuthenticationFetch from "@/config/withAuthentication"
import { CustomActionsResponseStandard } from "@/lib/useActionStateCustom"
import { ServerError } from "@/types/errors"
import type { PetStatus } from "@/types/pets/basicInfo/BasicInfo"

export async function CatalogPetStatuses(): Promise<
	CustomActionsResponseStandard<PetStatus[]>
> {
	try {
		const response = await WithAuthenticationFetch(
			`${process.env.NEXT_API_BASE_URL || ""}/pets/catalog/statuses`,
			{
				method: "GET",
			},
		)

		// The API names this list `petStatus`, singular — unlike `species` and `sexes`.
		const statuses: { petStatus: PetStatus[] } = await response.json()
		return { response: statuses.petStatus }
	} catch (error) {
		return {
			response: null,
			error: new ServerError(
				"Uncaught error",
				400,
				"The application was not able to sort out the error",
				"/api/pets/catalog/statuses",
				`uncaught_error-${Date.now().toLocaleString()}`,
			).ToJson(),
		}
	}
}

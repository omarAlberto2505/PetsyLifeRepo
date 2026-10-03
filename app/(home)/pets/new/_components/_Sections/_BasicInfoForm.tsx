import AutocompleteSearch from "@/components/autocomplete-search"
import RemoteSearchField from "@/components/remote-search-field"
import { CalendarDays, Camera, ChevronDown } from "lucide-react"
import FieldLabel from "../_controls/_FieldLabel"
import useCatalog from "../hooks/_useCatalog"
import useCreateNewPet from "../hooks/_useCreateNewPet"
import { searchBreeds } from "../hooks/searchBreeds"
const inputClassName =
	"h-10 w-full rounded-lg border border-(--color-border) bg-(--color-card-surface) px-3 text-sm text-(--color-primary-text) outline-none placeholder:text-(--color-muted-text) focus:border-(--color-primary-blue) focus:ring-2 focus:ring-(--color-card-icon-background)"

/**
 * `<input type="date">` wants `YYYY-MM-DD`. Built from the local parts rather than
 * `toISOString()`, which converts to UTC and can land the user a day off.
 */
function toDateInputValue(date: Date | null) {
	if (!date) return ""

	const month = `${date.getMonth() + 1}`.padStart(2, "0")
	const day = `${date.getDate()}`.padStart(2, "0")

	return `${date.getFullYear()}-${month}-${day}`
}

/** Parsed at local midnight, so the day cannot shift on the way back either. */
function fromDateInputValue(value: string) {
	return value ? new Date(`${value}T00:00:00`) : null
}

export default function BasicInfoForm({
    pet,
    onChageBasicInfo,
    uploadFile
}: {
    pet: ReturnType<typeof useCreateNewPet>["pet"]
    onChageBasicInfo: ReturnType<typeof useCreateNewPet>["onChageBasicInfo"]
    uploadFile: ReturnType<typeof useCreateNewPet>["uploadFile"]
}) {
	const { species, statuses, sexes } = useCatalog()

	return (
		<div className="rounded-xl border border-(--color-card-border) p-4 sm:p-5">
			<h2 className="mb-5 text-base font-bold text-(--color-primary-text)">
				Pet&apos;s basic information
			</h2>
			<div className="grid gap-4 sm:grid-cols-2">
				<div>
					<FieldLabel required>Name</FieldLabel>
					<input
						className={inputClassName}
						value={pet.name}
						onChange={(event) => onChageBasicInfo("name",event.target.value)}
						placeholder="e.g. Max"
					/>
				</div>
				<div>
					<FieldLabel required>Status</FieldLabel>
					<AutocompleteSearch
						items={statuses}
						value={pet.statusId === 0 ? null : pet.statusId}
						onChange={(value) =>
							onChageBasicInfo("statusId", value === null ? 0 : Number(value))
						}
						placeholder="Select one"
						aria-label={"status_id"}
					/>
				</div>
				<div>
					<FieldLabel required>Species</FieldLabel>
					<div className="">
						<AutocompleteSearch
							items={species}
							value={pet.speciesId}
							onChange={(value) => {
                                onChageBasicInfo(
                                    "speciesId",
                                    value === null ? 0 : Number(value),
                                    (pet) => { pet.breedId = 0}
                             )
							}}
							aria-label={"species_id"}
						/>
						<ChevronDown
							className="pointer-events-none absolute right-3 top-3 text-(--color-muted-text)"
							size={17}
						/>
					</div>
				</div>
				<div>
					<FieldLabel>Breed</FieldLabel>
					<RemoteSearchField
						value={pet.breedId === 0 ? null : pet.breedId}
						onChange={(value) => {
                            onChageBasicInfo("breedId",value === null ? 0 : Number(value))
                        }}
						search={(term, signal) => searchBreeds(pet.speciesId, term, signal)}
						deps={[species]}
						isDisabled={!species}
						placeholder="Search breeds..."
						notFoundLabel="Other"
						aria-label={"breed_id"}
					/>
				</div>
				<div>
					<FieldLabel required>Date of birth</FieldLabel>
					<div className="relative">
						<input
							className={`${inputClassName} pr-10`}
							type="date"
							value={toDateInputValue(pet.birthDate)}
							onChange={(event) =>
								onChageBasicInfo("birthDate", fromDateInputValue(event.target.value))
							}
						/>
						<CalendarDays
							className="pointer-events-none absolute right-3 top-3 text-(--color-muted-text)"
							size={17}
						/>
					</div>
					<label className="mt-2 flex items-center gap-2 text-sm text-(--color-secondary-text)">
						<input
							type="checkbox"
							checked={pet.isEstimated}
							onChange={(event) => onChageBasicInfo("isEstimated", event.target.checked)}
							className="size-4 accent-(--color-primary-blue)"
						/>
						This date is an estimate
					</label>
				</div>
				<fieldset className="sm:col-span-2">
					<legend className="mb-2 text-xs font-semibold text-(--color-primary-text)">
						Sex
						<span className="ml-0.5 text-(--color-primary-blue)">*</span>
					</legend>
					<div className="flex flex-wrap gap-5">
						{sexes?.map((sex) => (
							<label
								key={sex.id}
								className="flex items-center gap-2 text-sm text-(--color-secondary-text)"
							>
								<input
									type="radio"
									name="sexId"
									value={sex.id}
									checked={pet.sexId === sex.id}
									onChange={() => onChageBasicInfo("sexId", sex.id)}
									className="size-4 accent-(--color-primary-blue)"
								/>
								{sex.name}
							</label>
						))}
					</div>
				</fieldset>
				<div>
					<FieldLabel>Weight (kg)</FieldLabel>
					<input
						className={inputClassName}
						type="number"
						min="0"
						value={pet.weight}
						onChange={(event) => onChageBasicInfo("weight",Number(event.target.value))}
						placeholder="e.g. 25"
					/>
				</div>
				<div>
					<FieldLabel>Color</FieldLabel>
					<input
						className={inputClassName}
						value={pet.color}
						onChange={(event) => onChageBasicInfo("color",event.target.value)}
						placeholder="e.g. Golden"
					/>
				</div>
				<div>
					<FieldLabel>Microchip number</FieldLabel>
					<input
						className={inputClassName}
						value={pet.microchipNumber}
						onChange={(event) => onChageBasicInfo("microchipNumber",event.target.value)}
						placeholder="e.g. 981020000123456"
					/>
				</div>
				<div>
					<FieldLabel>Tattoo number</FieldLabel>
					<input
						className={inputClassName}
						value={pet.tattooNumber}
						onChange={(event) => onChageBasicInfo("tattooNumber",event.target.value)}
						placeholder="e.g. ABC123"
					/>
				</div>
				<div>
					<FieldLabel>Registration number</FieldLabel>
					<input
						className={inputClassName}
						value={pet.registrationNumber}
						onChange={(event) => onChageBasicInfo("registrationNumber",event.target.value)}
						placeholder="e.g. AKC-1234567"
					/>
				</div>
				<div className="sm:col-span-2">
					<FieldLabel>Notes</FieldLabel>
					<textarea
						className="min-h-24 w-full rounded-lg border border-(--color-border) bg-(--color-card-surface) px-3 py-2 text-sm text-(--color-primary-text) outline-none placeholder:text-(--color-muted-text) focus:border-(--color-primary-blue) focus:ring-2 focus:ring-(--color-card-icon-background)"
						value={pet.notes}
						onChange={(event) => onChageBasicInfo("notes",event.target.value)}
						placeholder="Anything else worth recording about this pet"
					/>
				</div>
				<div className="border-t border-(--color-card-divider) pt-4 sm:col-span-2">
					<FieldLabel>Photo</FieldLabel>
					<label className="flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-(--color-soft-purple-border) bg-(--color-background-soft-purplet) px-4 py-3 hover:border-(--color-primary-blue)">
						<span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-(--color-card-icon-background) text-(--color-primary-blue)">
							<Camera size={18} />
						</span>
						<span className="min-w-0 text-xs text-(--color-secondary-text)">
							<strong className="block text-(--color-primary-text)">
								{pet.photo?.name || "Upload a photo"}
							</strong>
							JPG, PNG or HEIC (max. 5MB)
						</span>
						<input
							type="file"
							accept="image/*"
							className="sr-only"
							onChange={(event) =>{
                                const file = event.target.files?.[0]

                                if(file) uploadFile(file)
							}}
						/>
					</label>
				</div>
			</div>
		</div>
	)
}

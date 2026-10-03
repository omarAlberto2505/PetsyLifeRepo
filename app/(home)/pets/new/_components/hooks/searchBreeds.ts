import type { Breed } from "@/types/pets/basicInfo/BasicInfo";

/**
 * Searches the breed catalog through the /api/catalog/breeds Route Handler.
 *
 * Not a Server Action: Next dispatches those one at a time per client, so a search
 * per keystroke queues up behind itself, and an in-flight action cannot be aborted.
 */
export async function searchBreeds(
    speciesId: number,
    term: string,
    signal: AbortSignal,
): Promise<Breed[]> {
    if (!speciesId) return []

    const query = new URLSearchParams({ speciesId: String(speciesId) })
    if (term.trim()) query.set("search", term.trim())

    const response = await fetch(`/api/catalog/breeds?${query}`, { signal })

    if (!response.ok) throw new Error(`Breed search failed with ${response.status}`)

    const data: { breeds: Breed[] } = await response.json()

    return data.breeds
}

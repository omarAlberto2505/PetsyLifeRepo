import { CatalogSexes } from '@/app/actions/catalog/sexes/action';
import { CatalogSpecies } from '@/app/actions/catalog/species/action';
import { CatalogPetStatuses } from '@/app/actions/catalog/statuses/action';
import { useActionStateCustom } from '@/lib/useActionStateCustom';
import { PetStatus, Sex, Species } from '@/types/pets/basicInfo/BasicInfo';

// Breeds are not here on purpose: they are searched per keystroke, which a Server
// Action serialises behind every other action. The breed field talks to
// /api/catalog/breeds directly instead.
//
// These three are small fixed lists fetched once, so a Server Action each is fine —
// though Next dispatches them one at a time, so page load makes three round trips.
const useCatalog = () => {

    const { response: species, isPending: isSpeciesPending } = useActionStateCustom<Species[]>({
        callback: async() => await CatalogSpecies(),
    })

    const { response: statuses, isPending: isStatusesPending } = useActionStateCustom<PetStatus[]>({
        callback: async() => await CatalogPetStatuses(),
    })

    const { response: sexes } = useActionStateCustom<Sex[]>({
        callback: async() => await CatalogSexes(),
    })

    return { species, isSpeciesPending, statuses, isStatusesPending, sexes }
}

export default useCatalog;

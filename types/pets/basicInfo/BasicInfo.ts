/** The shape every /pets/catalog lookup list returns (CatalogItemDTO on the API). */
export type CatalogItem = {
    id: number
    name: string
}

export type Breed = {
    id: number
    name: string
}


export type Species = {
    id: number
    name: string
    breeds?: Breed[]
}

/** Active, Inactive, Lost, Deceased. */
export type PetStatus = CatalogItem

/** Male, Female, Genderless, Unknown. */
export type Sex = CatalogItem

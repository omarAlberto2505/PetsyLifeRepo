import { useState } from 'react';

// Mirrors CreateNewPetEvent on the API. `isEstimated` is its `EstimatedDOB`, and the
// three id fields are 0 while unset because the API takes them as plain ints.
type CreateNewPet = {
    name: string
    statusId: number
    speciesId: number
    breedId: number
    sexId: number
    birthDate: Date | null
    isEstimated: boolean

    weight: number
    weightUnit: string

    color: string
    microchipNumber: string
    tattooNumber: string
    registrationNumber: string
    notes: string
    photo?: File
}

export default function useCreateNewPet (){

    const [pet, setPet] = useState<CreateNewPet>({
        name: "",
        statusId: 1,
        speciesId: 0,
        breedId: 0,
        sexId: 0,
        birthDate: null,
        isEstimated: false,
        weight: 0,
        weightUnit: '',

        color: '',
        microchipNumber: '',
        tattooNumber: '',
        registrationNumber: '',
        notes: '',
        photo: undefined

    })


    const onChageBasicInfo = <K extends keyof Omit<CreateNewPet, "photo">>(
        key: K,
        value: CreateNewPet[K],
        onCallback?: (pet: CreateNewPet) => void
    ) => {
        setPet(prevPet => {
            // TypeScript cannot see that a computed generic key still produces a
            // complete CreateNewPet, so the spread needs the assertion.
            const newPet = { ...prevPet, [key]: value} as CreateNewPet
            if(onCallback) onCallback(newPet)
            return newPet
        })
    }

    const uploadFile = (photoFile: File) => {
        setPet(prevPet => {
            const newPet = { ...prevPet, photo: photoFile}
            return newPet
        })
    }

    return {
        pet,
        onChageBasicInfo,
        uploadFile
    }
}

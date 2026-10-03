import type { StaticImageData } from "next/image"

export type Pet = {
    Id: string
    Name: string
    Species: string
    Breed: string
    Sex: string
    Date_Of_Birth: Date
    Estimated_Date_Of_Birth: Date
    Color: string
    Microchip_number: string
    Tattoo_number: string
    Registration_number: string
    Status: string
    Photo_url: string | StaticImageData
    Notes: string
}

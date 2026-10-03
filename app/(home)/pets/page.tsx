"use client"

import { MyPets } from "@/app/actions/user/pets/actions"
import EmblaCarousel from "@/components/app-carousel/embla-carousel"
import { useActionStateCustom } from "@/lib/useActionStateCustom"
import type { Pet } from "@/types/pet"
import { Button, Card, Separator, Tabs, Typography } from "@heroui/react"
import { Group, PawPrint, Plus } from "lucide-react"
import Link from "next/link"
import { useRef } from "react"
import NoPetsPage from "./_components/_NoPetsPage"
import CareSummary from "./_components/care-summary"
import CarouselPetCard from "./_components/carousel-card"

const pets: Pet[] = [
	{
		Id: "1000",
		Name: "Zaori",
		Species: "Dog",
		Breed: "Daschbun",
		Sex: "Female",
		Date_Of_Birth: new Date(),
		Estimated_Date_Of_Birth: new Date(),
		Color: "Black/white",
		Microchip_number: "x1000-100",
		Tattoo_number: "",
		Registration_number: "x2000-100",
		Status: "Active",
		Photo_url: "/pets/dog.jpg",
		Notes: "My favorite pet",
	},
	{
		Id: "1000x",
		Name: "Luxio",
		Species: "Cat",
		Breed: "Mixed",
		Sex: "Male",
		Date_Of_Birth: new Date(),
		Estimated_Date_Of_Birth: new Date(),
		Color: "Black/white",
		Microchip_number: "x1000-100",
		Tattoo_number: "",
		Registration_number: "x2000-100",
		Status: "Active",
		Photo_url: "/pets/cat.jpg",
		Notes: "My favorite pet",
	},
	{
		Id: "2000",
		Name: "Horsillo",
		Species: "Horse",
		Breed: "Thoroughbred",
		Sex: "Male",
		Date_Of_Birth: new Date(),
		Estimated_Date_Of_Birth: new Date(),
		Color: "Brown",
		Microchip_number: "x1000-100",
		Tattoo_number: "",
		Registration_number: "x2000-100",
		Status: "Active",
		Photo_url: "/pets/horse.jpg",
		Notes: "My least favorite pet",
	},
]

export default function Page() {
	const petsSectionRef = useRef<HTMLElement>(null)
	const sharedPetsSectionRef = useRef<HTMLElement>(null)

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const { response, isPending } = useActionStateCustom<any>({
		callback: async () => await MyPets(),
		initialState: undefined
	})
	
	const handleScrollToSection = (
		section: "PETS" | "SHARED_PETS" | "CARE_GIVING",
	) => {
		if (section === "PETS")
			petsSectionRef.current?.scrollIntoView({
				behavior: "smooth",
				block: "start",
			})
		if (section === "SHARED_PETS")
			sharedPetsSectionRef.current?.scrollIntoView({
				behavior: "smooth",
				block: "start",
			})
	}

	if (pets.length === 0) return <NoPetsPage />
	return (
		<div className="grid w-full gap-3 lg:grid-cols-[20rem_minmax(0,1fr)] lg:items-start">
			<CareSummary />
			<div className="flex min-w-0 flex-col gap-3">
				<Card className="rounded-lg p-4">
					<Card.Content className="flex flex-row w-full gap-3 rounded-lg">
						<PawPrint
							fill="var(--color-tertiary-blue)"
							className="text-(--color-tertiary-blue)"
							size={40}
						/>
						<div className="flex flex-1 justify-between">
							<div className="w-fit flex flex-col">
								<Typography className="text-2xl font-bold">
									Hello, Alex!
								</Typography>
								<Typography className="text-sm text-(--color-secondary-text)">
									Here are your pets, shared pets and the care you've provided
								</Typography>
							</div>
							<Button className="rounded-2xl w-35 mt-1 bg-(--color-primary-purple) hover:bg-accent">
								<Plus fill="white" />
								<Link className="text-sm" href="/pets/new">Register a pet</Link>
							</Button>
						</div>
					</Card.Content>
				</Card>
				<Card className="rounded-lg">
					<Card.Content>
						<div className="w-full flex ">
							<Tabs className="w-full max-w-md" variant="secondary">
								<Tabs.ListContainer>
									<Tabs.List aria-label="Options">
										<Tabs.Tab
											id="pets"
											className="gap-1 text-sm"
											onClick={() => handleScrollToSection("PETS")}
										>
											My Pets{" "}
											<span className="w-5 p-0.5 rounded-[50%] bg-(--color-primary-purple) text-white text-xs">
												2
											</span>
											<Tabs.Indicator />
										</Tabs.Tab>
										<Tabs.Tab
											id="shared_pets"
											className="gap-1 text-sm"
											onClick={() => handleScrollToSection("SHARED_PETS")}
										>
											Shared Pets{" "}
											<span className="w-5 p-0.5 rounded-[50%] bg-(--color-muted-text) text-white text-xs">
												2
											</span>
											<Tabs.Indicator />
										</Tabs.Tab>
										<Tabs.Tab id="care_giver" className="gap-1 text-sm">
											Care Giver{" "}
											<span className="w-5 p-0.5 rounded-[50%] bg-(--color-muted-text) text-white text-xs">
												2
											</span>
											<Tabs.Indicator />
										</Tabs.Tab>
									</Tabs.List>
								</Tabs.ListContainer>
							</Tabs>
						</div>
						<section
							id="my_pets"
							ref={petsSectionRef}
							className="w-full flex flex-col mt-3 scroll-mt-20"
						>
							<Typography className="text-xl font-bold">My Pets</Typography>
							<Typography className="text-sm font-bold text-(--color-muted-text)">
								Pets Registed in your account
							</Typography>
							<div className="mt-4">
								<EmblaCarousel
									slides={pets.map((pet) => (
										<CarouselPetCard key={pet.Id} pet={pet} />
									))}
									options={{ align: "start" }}
								/>
							</div>
						</section>
						<Separator className="w-full mt-4" />
						<section
							ref={sharedPetsSectionRef}
							className="w-full flex flex-col mt-2"
						>
							<div className="text-xl font-bold flex flex-row items-center gap-1">
								<Group size={30} className="text-(--color-tertiary-blue)" />
								Shared Pets
							</div>
							<Typography className="text-sm font-bold text-(--color-muted-text)">
								Pets you have access to with your family
							</Typography>
							<div className="mt-4">
								<EmblaCarousel
									slides={pets
										.slice(2)
										.map((pet) => <CarouselPetCard key={pet.Id} pet={pet} />)}
									options={{ align: "start" }}
								/>
							</div>
						</section>
					</Card.Content>
				</Card>
			</div>
		</div>
	)
}

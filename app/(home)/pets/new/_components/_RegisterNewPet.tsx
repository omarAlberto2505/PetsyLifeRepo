"use client"

import {
	ArrowRight,
	Check,
	HeartPulse,
	Syringe
} from "lucide-react"
import Image from "next/image"
import Header from "./_RegisterPetHeader"
import BasicInfoForm from "./_Sections/_BasicInfoForm"
import useCreateNewPet from "./hooks/_useCreateNewPet"
import useSectionHandler from "./hooks/_useSectionHandler"


export default function RegisterNewPetComponent() {
	const { activeSection, setActiveSection, goBack, goNext, sections } =
		useSectionHandler()
	const { pet, onChageBasicInfo, uploadFile} = useCreateNewPet()

	return (
		<div className="min-h-full w-full bg-(--background) ">
			<div className="mx-auto grid min-h-[calc(100vh-2rem)] max-w-6xl overflow-hidden rounded-2xl border border-(--color-card-border) bg-(--color-card-surface) shadow-[0_8px_30px_var(--color-card-shadow)] lg:grid-cols-[minmax(0,1.65fr)_minmax(18rem,0.85fr)]">
				<main className="flex min-w-0 flex-col p-5 sm:p-8">
					<Header activeSection={activeSection} setActiveSection={setActiveSection} />

					<section className="flex-1">
						{activeSection === 0 && (
							<BasicInfoForm 
								{...{ pet, onChageBasicInfo, uploadFile }}
							/>
						)}

						{activeSection > 0 && activeSection < sections.length - 1 && (
							<div className="flex min-h-64 flex-col items-center justify-center rounded-xl border border-(--color-card-border) p-6 text-center">
								<span className="mb-3 flex size-12 items-center justify-center rounded-full bg-(--color-card-icon-background) text-(--color-primary-blue)">
									{activeSection === 1 ? (
										<Syringe size={22} />
									) : (
										<HeartPulse size={22} />
									)}
								</span>
								<h2 className="text-lg font-bold text-(--color-primary-text)">
									{sections[activeSection]}
								</h2>
								<p className="mt-2 max-w-sm text-sm text-(--color-secondary-text)">
									You can add this information after the basic details are
									saved.
								</p>
							</div>
						)}

						{activeSection === sections.length - 1 && (
							<div className="flex min-h-64 flex-col items-center justify-center rounded-xl border border-(--color-card-border) p-6 text-center">
								<span className="mb-3 flex size-12 items-center justify-center rounded-full bg-(--color-status-healthy-background) text-(--color-status-healthy)">
									<Check size={24} />
								</span>
								<h2 className="text-lg font-bold text-(--color-primary-text)">
									Ready to finish
								</h2>
								<p className="mt-2 max-w-sm text-sm text-(--color-secondary-text)">
									Review your pet&apos;s information and finish registration.
								</p>
							</div>
						)}
					</section>

					<div className="mt-6 flex justify-end gap-3">
						{activeSection > 0 && (
							<button
								type="button"
								onClick={goBack}
								className="rounded-lg border border-(--color-border) px-5 py-2.5 text-sm font-semibold text-(--color-primary-text) hover:bg-(--color-card-hover-background)"
							>
								Back
							</button>
						)}
						<button
							type="button"
							onClick={goNext}
							className="inline-flex items-center gap-2 rounded-lg bg-(--color-primary-blue) px-6 py-2.5 text-sm font-semibold text-white hover:bg-(--color-deep-blue)"
						>
							{activeSection === sections.length - 1 ? "Finish" : "Next"}
							{activeSection === sections.length - 1 ? (
								<Check size={16} />
							) : (
								<ArrowRight size={16} />
							)}
						</button>
					</div>
				</main>

				<aside className="relative hidden min-h-full overflow-hidden bg-(--color-background-soft-purplet) lg:block">
					<div className="absolute inset-0 flex flex-col items-center justify-center p-8">
						<div className="relative aspect-square w-full max-w-md">
							<Image
								src="/HuggingDog.png"
								alt="A pet owner with her dog"
								fill
								sizes="(min-width: 1024px) 35vw, 0px"
								className="object-contain"
								priority
							/>
						</div>
						<p className="max-w-xs text-center text-2xl font-bold leading-tight text-(--color-primary-blue)">
							Because every pet has a story
						</p>
						<span className="mt-4 text-2xl text-(--color-primary-blue)">♥</span>
					</div>
				</aside>
			</div>
		</div>
	)
}

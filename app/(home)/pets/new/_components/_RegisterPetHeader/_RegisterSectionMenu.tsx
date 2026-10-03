import { Check } from "lucide-react"
import { sectionIcons, sections } from "../hooks/_useSectionHandler"

const RegisterSectionMenu = (props: {
	activeSection: number
	setActiveSection: (sectionId: number) => void
}) => {
	const { activeSection, setActiveSection } = props
	return (
		<nav
			aria-label="Registration progress"
			className="mb-7 overflow-x-auto pb-1"
		>
			<ol className="flex min-w-[34rem] items-start">
				{sections.map((section, index) => {
					const Icon = sectionIcons[index]
					const isActive = index === activeSection
					const isComplete = index < activeSection
					return (
						<li key={section} className="flex flex-1 items-start">
							<button
								type="button"
								onClick={() => setActiveSection(index)}
								className="flex min-w-0 flex-col items-center gap-1.5 text-center"
							>
								<span
									className={`flex size-8 items-center justify-center rounded-full border text-xs font-bold ${
										isActive || isComplete
											? "border-(--color-primary-blue) bg-(--color-primary-blue) text-green-700"
											: "border-(--color-border) bg-(--color-background-soft-purplet) text-(--color-muted-text)"
									}`}
								>
									{isComplete ? (
										<Check className="text-green-700" size={15} />
									) : (
										<Icon size={15} />
									)}
								</span>
								<span
									className={`whitespace-nowrap text-[11px] font-semibold ${isActive 
                                        ? "text-(--color-primary-blue)" 
                                        : "text-(--color-muted-text)"}`}
								>
									{section}
								</span>
							</button>
							{index < sections.length - 1 && (
								<span
									className={`mt-4 h-px flex-1 ${
                                        index < activeSection 
                                        ? "bg-(--color-primary-blue)" 
                                        : "bg-(--color-border)"}`
                                    }
								/>
							)}
						</li>
					)
				})}
			</ol>
		</nav>
	)
}

export default RegisterSectionMenu

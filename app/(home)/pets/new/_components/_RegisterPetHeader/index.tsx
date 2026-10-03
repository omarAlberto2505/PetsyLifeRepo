import RegisterSectionMenu from "./_RegisterSectionMenu"
import useSectionHandler from "../hooks/_useSectionHandler"

export default function Header(props: {
	activeSection: ReturnType<typeof useSectionHandler>["activeSection"]
	setActiveSection: ReturnType<typeof useSectionHandler>["setActiveSection"]
}) {
	const { activeSection, setActiveSection } = props
	return (
		<>
			<div className="mb-7 flex items-start justify-between gap-5">
				<div>
					<h1 className="text-2xl font-bold text-(--color-primary-text) sm:text-3xl">
						Register your pet
					</h1>
					<p className="mt-1 max-w-md text-sm leading-5 text-(--color-secondary-text)">
						Tell us about your pet so we can keep their information and health
						records up to date.
					</p>
				</div>
			</div>

			<RegisterSectionMenu
				activeSection={activeSection}
				setActiveSection={setActiveSection}
			/>
		</>
	)
}

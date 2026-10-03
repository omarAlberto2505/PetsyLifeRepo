import { NavSection } from "@/config/navigation"
import { Popover } from "@heroui/react"
import { cn } from "@heroui/styles"
import { useState } from "react"
import NavLink from "./nav-link"

/**
 * On the rail a section can't expand inline, so its children open in a popover
 * anchored to the section icon.
 */
export default function CollapsedSection({
	section,
	activeHref,
	containsActive,
	onNavigate,
}: {
	section: NavSection
	activeHref: string | undefined
	containsActive: boolean
	onNavigate?: () => void
}) {
	const [isOpen, setOpen] = useState(false)
	const SectionIcon = section.icon

	return (
		<Popover isOpen={isOpen} onOpenChange={setOpen}>
			<Popover.Trigger
				aria-label={section.label}
				title={section.label}
				className={cn(
					"flex w-full cursor-pointer items-center justify-center rounded-lg py-2 transition-colors",
					containsActive
						? "bg-accent-soft text-accent-soft-foreground"
						: "text-foreground hover:bg-default",
				)}
			>
				<SectionIcon
					className={cn(
						"size-5 shrink-0",
						containsActive ? "text-accent" : "text-muted",
					)}
				/>
			</Popover.Trigger>
			<Popover.Content placement="right top" className="w-56 p-0">
				<Popover.Dialog aria-label={section.label} className="p-2">
					<p className="px-3 pb-1 text-xs font-medium text-muted">
						{section.label}
					</p>
					<div className="space-y-1">
						{section.children.map((child) => (
							<NavLink
								key={child.href}
								item={child}
								active={child.href === activeHref}
								onNavigate={() => {
									setOpen(false)
									onNavigate?.()
								}}
							/>
						))}
					</div>
				</Popover.Dialog>
			</Popover.Content>
		</Popover>
	)
}

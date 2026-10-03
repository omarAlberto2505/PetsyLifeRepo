import { NavItem } from "@/config/navigation"
import { cn } from "@heroui/styles"
import Link from "next/link"


export default function NavLink({
	item,
	active,
	collapsed = false,
	onNavigate,
}: {
	item: NavItem
	active: boolean
	collapsed?: boolean
	onNavigate?: () => void
}) {
	const Icon = item.icon

	return (
		<Link
			href={item.href}
			onClick={onNavigate}
			aria-current={active ? "page" : undefined}
			aria-label={collapsed ? item.label : undefined}
			title={collapsed ? item.label : undefined}
			className={cn(
				"group flex items-center gap-3 rounded-lg py-2 text-sm transition-colors hover:bg-(--color-text-hover-purple) hover:text-(--color-tertiary-purple)",
				collapsed ? "justify-center px-0" : "px-3",
				active
					? "bg-(--color-text-hover-purple) text-(--color-tertiary-purple) font-medium"
					: "text-(--color-primary-text) font-semibold ",
			)}
		>
			<Icon
				className={cn("size-5 shrink-0 group-hover:text-(--color-tertiary-purple)", active ? "text-(--color-tertiary-purple)" : "text-muted")}
			/>
			{!collapsed && <span className="truncate">{item.label}</span>}
		</Link>
	)
}

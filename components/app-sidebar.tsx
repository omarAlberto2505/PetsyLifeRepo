"use client"

import {
	NAVIGATION,
	type NavItem,
	type NavSection,
	resolveActiveHref,
	ResourcesNavigator,
	SharingAndFamiliyNavigation,
} from "@/config/navigation"
import { cn, Disclosure, Popover } from "@heroui/react"
import { Home, PanelLeftClose, PanelLeftOpen } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import ApplicationIcon from "../public/icon.png"
import NavLinkRendering from "./app-sidebar/nav-rendering"

type AppSidebarProps = {
	/** Closes the mobile drawer after a navigation. */
	onNavigate?: () => void
	/** Renders the icon-only rail. Ignored when `onToggleCollapse` is absent. */
	collapsed?: boolean
	/** When provided, the collapse toggle is rendered at the bottom of the rail. */
	onToggleCollapse?: () => void
}

export default function AppSidebar({
	onNavigate,
	collapsed = false,
	onToggleCollapse,
}: AppSidebarProps) {
	const pathname = usePathname()
	const activeHref = resolveActiveHref(pathname)
	const dashboardActive = pathname?.endsWith("dashboard")

	return (
		<div className="flex h-full flex-col bg-(--color-background-soft-purplet) bg-opacity-25">
			<div
				className={cn(
					"flex h-16 shrink-0 items-center gap-2 border-border",
					collapsed ? "justify-center px-0 pt-3" : "px-5 pt-3",
				)}
			>
				<Image src={ApplicationIcon} className="max-w-14"  alt="Application icon" />
				{!collapsed && (
					<span className="truncate font-semibold text-xl">PetsyLife</span>
				)}
			</div>

			<nav
				className={cn(
					"flex-1 space-y-1 overflow-y-auto py-3",
					collapsed ? "px-2" : "px-3",
				)}
			>
				<Disclosure
					className="border-none bg-transparent p-0 shadow-none"
					defaultExpanded={false}
				>
					<Disclosure.Heading>
						<Disclosure.Trigger className={
							cn(`group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-(--color-text-hover-purple)
							hover:text-(--color-tertiary-purple)`,
							dashboardActive ? "text-(--color-tertiary-purple) bg-(--color-text-hover-purple)" : ""
						)} 
						>
							<Home className={cn("shrink-0 text-muted size-6",
								dashboardActive ? "text-(--color-tertiary-purple)" : ""
							)} />
							{ !collapsed && <span className="flex-1 text-left text-sm font-semibold ">Dashboard</span> }							
						</Disclosure.Trigger>
					</Disclosure.Heading>
					
				</Disclosure>

				<Disclosure
					className="border-none bg-transparent p-0 shadow-none"
					defaultExpanded={false}
				>
					<Disclosure.Heading className="group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium">
						{ !collapsed && <span className="flex-1 text-left  text-(--color-secondary-text) ">Pet Care</span> }
					</Disclosure.Heading>
				</Disclosure>

				<NavLinkRendering navigation={NAVIGATION} activeHref={activeHref} onNavigate={onNavigate} collapsed={collapsed} />

				<Disclosure
					className="border-none bg-transparent p-0 shadow-none"
					defaultExpanded={false}
				>
					<Disclosure.Heading className="group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium">
						{ !collapsed && <span className="flex-1 text-left  text-(--color-secondary-text) ">Sharing & Family</span> }
					</Disclosure.Heading>
					

				</Disclosure>
				<NavLinkRendering navigation={SharingAndFamiliyNavigation} activeHref={activeHref} onNavigate={onNavigate} collapsed={collapsed} />

				<Disclosure
					className="border-none bg-transparent p-0 shadow-none"
					defaultExpanded={false}
				>
					<Disclosure.Heading className="group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium">
						{ !collapsed && <span className="flex-1 text-left  text-(--color-secondary-text) ">Resources</span> }
					</Disclosure.Heading>
					

				</Disclosure>
				<NavLinkRendering navigation={ResourcesNavigator} activeHref={activeHref} onNavigate={onNavigate} collapsed={collapsed} />

			</nav>

			{onToggleCollapse && (
				<div
					className={cn(
						"shrink-0 border-t border-border py-3",
						collapsed ? "px-2" : "px-3",
					)}
				>
					<button
						type="button"
						onClick={onToggleCollapse}
						aria-label={collapsed ? "Expand navigation" : "Collapse navigation"}
						aria-expanded={!collapsed}
						title={collapsed ? "Expand navigation" : "Collapse navigation"}
						className={cn(
							"flex w-full items-center gap-3 rounded-lg py-2 text-sm text-foreground transition-colors hover:bg-default",
							collapsed ? "justify-center px-0" : "px-3",
						)}
					>
						{collapsed ? (
							<PanelLeftOpen className="size-4 shrink-0 text-muted" />
						) : (
							<PanelLeftClose className="size-4 shrink-0 text-muted" />
						)}
						{!collapsed && <span className="truncate">Collapse</span>}
					</button>
				</div>
			)}
		</div>
	)
}

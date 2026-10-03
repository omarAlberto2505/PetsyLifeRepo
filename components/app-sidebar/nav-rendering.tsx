import { NavEntry, NAVIGATION } from "@/config/navigation";
import { Disclosure } from "@heroui/react";
import { cn } from "@heroui/styles";

import CollapsedSection from "./collapsed-section";
import NavLink from "./nav-link";

export default function NavLinkRendering({
    collapsed,
	navigation,
    activeHref,
    onNavigate
}: { collapsed: boolean, navigation: NavEntry[], activeHref?: string, onNavigate?: (() => void) | undefined}) {
  const component = navigation.map((entry) => {
    if (entry.kind === "item") {
      return (
        <NavLink
          key={entry.href}
          item={entry}
          active={entry.href === activeHref}
          collapsed={collapsed}
          onNavigate={onNavigate}
        />
      );
    }

    const containsActive = entry.children.some(
      (child) => child.href === activeHref,
    );

    if (collapsed) {
      return (
        <CollapsedSection
          key={entry.label}
          section={entry}
          activeHref={activeHref}
          containsActive={containsActive}
          onNavigate={onNavigate}
        />
      );
    }

    const SectionIcon = entry.icon;

    return (
      <Disclosure
        key={entry.label}
        defaultExpanded={containsActive}
        className="border-none bg-transparent p-0 shadow-none"
      >
        <Disclosure.Heading>
          <Disclosure.Trigger
            className={cn(
              `group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-foreground
                                                hover:bg-(--color-text-hover-purple)
                                                hover:text-(--color-tertiary-purple)`,
            )}
          >
            <SectionIcon className="group-hover:text-(--color-tertiary-purple) size-6 shrink-0 text-muted " />
            <span className="flex-1 text-left">{entry.label}</span>
            <Disclosure.Indicator className="size-4 shrink-0 text-muted" />
          </Disclosure.Trigger>
        </Disclosure.Heading>
        <Disclosure.Content>
          <Disclosure.Body className="mt-1 ml-5 space-y-1 border-l border-border p-0 pl-3">
            {entry.children.map((child) => (
              <NavLink
                key={child.href}
                item={child}
                active={child.href === activeHref}
                onNavigate={onNavigate}
              />
            ))}
          </Disclosure.Body>
        </Disclosure.Content>
      </Disclosure>
    );
  });

  return component
}





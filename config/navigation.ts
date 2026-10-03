import {
  Ambulance,
  Bell,
  BookOpenText,
  ClipboardClock,
  ClipboardList,
  type LucideIcon,
  MapPin,
  NetworkIcon,
  PawPrint,
  Pill,
  Users
} from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  header?: string
};

export type NavSection = {
  header?: string
  kind: "section";
  label: string;
  icon: LucideIcon;
  children: NavItem[];
};

export type NavEntry = ({ kind: "item" } & NavItem) | NavSection;

export const SharingAndFamiliyNavigation: NavEntry[] = [
  {
    kind: "item",
    label: "Shared with me",
    href: "/shared_with_me",
    icon: Users
  },
  {
    kind: "item",
    label: "Pet family tree",
    href: "/pet_family_tree",
    icon: NetworkIcon
  },
]

export const ResourcesNavigator: NavEntry[] = [
  {
    kind: "item",
    label: "Pet Care tips",
    href: "/pet_care_tips",
    icon: BookOpenText
  },
  {
    kind: "item",
    label: "Find a vet",
    href: "/find_a_vet",
    icon: MapPin
  },
    {
    kind: "item",
    label: "Emergency",
    href: "/emergency",
    icon: Ambulance
  },
]

export const NAVIGATION: NavEntry[] = [
  {
    kind: "item",
    label: "Pets",
    href: "/pets",
    icon: PawPrint
  },
  {
    header:"Pets",
    kind: "item",
    label: "Medical records",
    href: "/profile",
    icon: ClipboardList,
  },
  {
    kind: "item",
    label: "Appointments",
    href: "/appointments",
    icon: ClipboardClock,
  },
   {
    kind: "item",
    label: "Medications",
    href: "/medications",
    icon: Pill,
  },
     {
    kind: "item",
    label: "Bells",
    href: "/bells",
    icon: Bell,
  },
]



const ALL_HREFS = [...NAVIGATION, ...SharingAndFamiliyNavigation].flatMap((entry) =>
  entry.kind === "item"
    ? [entry.href]
    : entry.children.map((child) => child.href),
);

export function resolveActiveHref(pathname: string): string | undefined {
  return ALL_HREFS.find((ref) => ref.includes(pathname));
}

export function resolveActiveTitle(pathname: string): string {
  const activeHref = resolveActiveHref(pathname);
  if (!activeHref) {
    return "Pets' Track";
  }

  for (const entry of [...NAVIGATION,...SharingAndFamiliyNavigation]) {
    if (entry.kind === "item" && entry.href === activeHref) {
      return entry.label;
    }
    if (entry.kind === "section") {
      const child = entry.children.find((c) => c.href === activeHref);
      if (child) {
        return `${entry.label} · ${child.label}`;
      }
    }
  }

  return "Laboratory Analysis";
}

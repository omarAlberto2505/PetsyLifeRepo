"use client";

import { Avatar, cn, Drawer, SearchField } from "@heroui/react";
import { ArrowLeft, Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { type ReactNode, useEffect, useState } from "react";
import AppSidebar from "@/components/app-sidebar";
import { resolveActiveTitle } from "@/config/navigation";
import { useSession } from "next-auth/react";

const COLLAPSE_STORAGE_KEY = "app-sidebar-collapsed";

export default function AppShell({ children }: { children: ReactNode }) {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isCollapsed, setCollapsed] = useState(false);
  // The stored preference is only readable on the client, so it is applied
  // after mount — width transitions stay off until then to avoid a load-time
  // animation.
  const [isHydrated, setHydrated] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();
  
  useEffect(() => {
    setCollapsed(window.localStorage.getItem(COLLAPSE_STORAGE_KEY) === "true");
    setHydrated(true);
  }, []);

  const toggleCollapsed = () => {
    setCollapsed((previous) => {
      const next = !previous;
      window.localStorage.setItem(COLLAPSE_STORAGE_KEY, String(next));
      return next;
    });
  };

  return (
    <div className="flex bg-background text-foreground">
      <aside
        className={cn(
          "sticky top-0 hidden h-dvh shrink-0 border-r border-border bg-surface md:block",
          isCollapsed ? "w-16" : "w-68",
          isHydrated && "transition-[width] duration-200 ease-out",
        )}
      >
        <AppSidebar
          collapsed={isCollapsed}
          onToggleCollapse={toggleCollapsed}
        />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col max-md:h-screen ">
        <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-3 border-b  border-border bg-surface px-4 sm:px-6">
          <Drawer isOpen={isDrawerOpen} onOpenChange={setDrawerOpen}>
            <Drawer.Trigger
              aria-label="Open navigation"
              className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg text-foreground hover:bg-default md:hidden"
            >
              <Menu className="size-5" />
            </Drawer.Trigger>
            <Drawer.Backdrop>
              <Drawer.Content
                placement="left"
                className="w-68 max-w-[85vw] bg-surface p-0"
              >
                <Drawer.Dialog aria-label="Navigation" className="h-full p-0">
                  <AppSidebar onNavigate={() => setDrawerOpen(false)} />
                </Drawer.Dialog>
              </Drawer.Content>
            </Drawer.Backdrop>
          </Drawer>

          <div className="w-full flex flex-row justify-between items-center">
            <div className="w-full flex flex-row gap-5 items-center">
              <button
                type="button"
                onClick={() => window.history.back()}
                className="flex w-fit items-center gap-2 text-sm font-semibold text-(--color-primary-blue) hover:underline"
              >
                <ArrowLeft size={17} />
                Back
              </button>
              <SearchField name="search" aria-label="searching">
                <SearchField.Group className={"bg-gray-200"}>
                  <SearchField.SearchIcon />
                  <SearchField.Input
                    className="w-[280px]"
                    placeholder="Search pets, records, or appointments"
                  />
                  <SearchField.ClearButton />
                </SearchField.Group>
              </SearchField>

            </div>

            <div className="flex flex-row items-center gap-2">
              <Avatar>
                <Avatar.Image
                  alt="Blue"
                  src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg"
                />

                <Avatar.Fallback>B</Avatar.Fallback>
              </Avatar>
              <span className="text-xs">{session?.user.name}</span>
            </div>
          </div>
        </header>

        <main className="flex-1 px-4 py-6 sm:px-6 max-sm:h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}

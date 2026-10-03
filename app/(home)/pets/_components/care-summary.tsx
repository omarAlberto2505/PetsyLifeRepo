"use client";

import {
  ArrowRight,
  CalendarDays,
  FileText,
  HeartPulse,
  NotebookTabs,
  Pill,
  Syringe,
} from "lucide-react";
import Image from "next/image";

const careItems = [
  { label: "Vaccines", detail: "Last: 04/08/2025", count: "4", icon: Syringe },
  {
    label: "Appointments",
    detail: "Next: 18/09/2025",
    count: "6",
    icon: CalendarDays,
  },
  {
    label: "Health records",
    detail: "Latest: 10/07/2025",
    count: "12",
    icon: FileText,
  },
  { label: "Medications", detail: "Active", count: "8", icon: Pill },
  {
    label: "Notes",
    detail: "Recent: 02/06/2025",
    count: "5",
    icon: NotebookTabs,
  },
];

export default function CareSummary() {
  return (
    <aside className="w-full flex-col gap-4 lg:max-w-xs lg:flex hidden">
      <div className="overflow-hidden rounded-2xl bg-(--color-card-image-background)">
        <div className="relative aspect-[1.3] w-full">
          <Image
            src="/HuggingDog.png"
            alt="A pet owner caring for her dog"
            fill
            sizes="(min-width: 1024px) 20rem, 100vw"
            className="object-contain object-bottom"
          />
        </div>
        <div className="bg-(--color-card-surface) px-4 pb-5 pt-3">
          <h2 className="text-xl font-bold leading-tight text-(--color-card-heading)">
            Your care makes
            <br />a big difference
          </h2>
          <p className="mt-2 text-sm leading-5 text-(--color-card-text)">
            Every vaccine, checkup and little moment of care keeps them
            healthier and happier.
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-(--color-card-border) bg-(--color-card-surface) shadow-[0_8px_24px_var(--color-card-shadow)]">
        <div className="flex items-center justify-between px-4 py-4">
          <h2 className="flex items-center gap-2 text-sm font-bold text-(--color-card-heading)">
            <HeartPulse size={21} className="text-(--color-primary-blue)" />
            Care you've provided
          </h2>
          <button
            type="button"
            className="text-xs font-semibold text-(--color-primary-blue) hover:underline"
          >
            View all
          </button>
        </div>

        <div className="border-t border-(--color-card-divider)">
          {careItems.map(({ label, detail, count, icon: Icon }) => (
            <button
              key={label}
              type="button"
              className="flex w-full items-center gap-3 border-b border-(--color-card-divider) px-4 py-3 text-left last:border-b-0 hover:bg-(--color-card-hover-background)"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-(--color-card-icon-background) text-(--color-primary-blue)">
                <Icon size={18} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-xs font-medium text-(--color-card-text)">
                  {label}
                </span>
                <span className="mt-0.5 block truncate text-[11px] text-(--color-card-text-soft)">
                  {detail}
                </span>
              </span>
              <span className="text-xs font-bold text-(--color-card-heading)">
                {count}
              </span>
              <ArrowRight
                size={16}
                className="shrink-0 text-(--color-card-text-soft)"
              />
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}

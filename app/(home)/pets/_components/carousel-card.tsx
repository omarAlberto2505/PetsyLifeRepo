"use client";

import { Card } from "@heroui/react";
import {
  ArrowRight,
  CalendarDays,
  EllipsisVertical,
  FileText,
  Heart,
  Mars,
  Syringe,
  Venus,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { Pet } from "@/types/pet";

type CarouselPetCardProps = {
  pet: Pet;
};

export default function CarouselPetCard(props: CarouselPetCardProps) {
  const { pet } = props;
  const navigate = useRouter();
  const birthDate = pet.Date_Of_Birth;
  const age = Math.max(0, new Date().getFullYear() - birthDate.getFullYear());
  const SexIcon =
    pet.Sex === "Female" ? (
      <Venus className="text-(--color-sex-female)" size={19} />
    ) : (
      <Mars className="text-(--color-sex-male)" size={19} />
    );

  return (
    <Card className="w-full overflow-hidden rounded-3xl cursor-pointer border border-(--color-card-border) bg-(--color-card-surface) p-3 shadow-[0_8px_24px_var(--color-card-shadow)]">
      <div className="relative aspect-[1.85] overflow-hidden rounded-2xl bg-(--color-card-image-background)">
        <Image
          className="h-full w-full object-cover"
          fill
          sizes="(min-width: 1200px) 33vw, (min-width: 768px) 50vw, 100vw"
          src={pet.Photo_url}
          alt={`${pet.Name}, ${pet.Species}`}
        />
        <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-(--color-status-healthy-background) px-3 py-1.5 text-xs font-semibold text-(--color-status-healthy)">
          <Heart size={15} fill="currentColor" />
          Healthy
        </span>
      </div>

      <div className="px-1 pt-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="truncate text-2xl font-bold text-(--color-card-heading)">
            {pet.Name}
          </h3>
          <button
            type="button"
            aria-label={`More options for ${pet.Name}`}
            className="shrink-0 rounded-full p-1 text-(--color-card-icon) transition-colors hover:bg-(--color-card-hover-background)"
          >
            <EllipsisVertical size={22} />
          </button>
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-(--color-card-text)">
          <span className="inline-flex items-center gap-1.5 font-bold text-(--color-card-text-strong)">
            {SexIcon}
            {pet.Sex}
          </span>
          <span aria-hidden="true" className="text-(--color-card-text-soft)">
            •
          </span>
          <span>
            {age} {age === 1 ? "year" : "years"} (
            {birthDate.toLocaleDateString()})
          </span>
        </div>
        <div className="mt-2 truncate text-sm text-(--color-card-text)">
          {pet.Breed}{" "}
          <span className="mx-2 text-(--color-card-text-soft)">•</span>{" "}
          {pet.Color}
        </div>

        <div className="mt-5 grid grid-cols-[1fr_1fr_1fr_auto] items-end gap-2 border-t border-(--color-card-divider) pt-4 text-center text-xs font-medium text-(--color-card-text)">
          <button
            type="button"
            className="flex flex-col items-center gap-2 hover:text-(--color-card-icon) text-xs"
          >
            <FileText size={22} />
            Records
          </button>
          <button
            type="button"
            className="flex flex-col items-center gap-2 hover:text-(--color-card-icon)"
          >
            <Syringe size={22} />
            Vaccines
          </button>
          <button
            type="button"
            className="flex flex-col items-center gap-2 hover:text-(--color-card-icon)"
          >
            <CalendarDays size={22} />
            Appointments
          </button>
          <button
            type="button"
            aria-label={`Open ${pet.Name}`}
            onClick={() => navigate.push(`/pets/${pet.Id}`)}
            className="mb-0.5 flex size-11 items-center justify-center rounded-full bg-(--color-card-icon-background) text-(--color-card-icon-soft) transition-colors hover:bg-(--color-card-icon-background-hover)"
          >
            <ArrowRight size={22} />
          </button>
        </div>
      </div>
    </Card>
  );
}

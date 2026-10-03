import { NextResponse, type NextRequest } from "next/server";

export type BreedSearchResponse = {
  breeds: { id: number; name: string }[];
  hasMore: boolean;
};


export async function GET(request: NextRequest) {
  const speciesId = Number(request.nextUrl.searchParams.get("speciesId"));
  const search = request.nextUrl.searchParams.get("search")?.trim() ?? "";

  if (!Number.isInteger(speciesId) || speciesId <= 0) {
    return NextResponse.json<BreedSearchResponse>(
      { breeds: [], hasMore: false },
      { status: 400 },
    );
  }

  const upstream = new URL(
    `${process.env.NEXT_API_BASE_URL || ""}/pets/catalog/species/${speciesId}/breeds`,
  );
  if (search) upstream.searchParams.set("search", search);

  const response = await fetch(upstream, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  if (!response.ok) {
    return NextResponse.json<BreedSearchResponse>(
      { breeds: [], hasMore: false },
      { status: response.status },
    );
  }

  const data = await response.json();

  return NextResponse.json<BreedSearchResponse>({
    breeds: (data.breeds ?? []).map((breed: { id: number; name: string }) => ({
      id: breed.id,
      name: breed.name,
    })),
    hasMore: Boolean(data.hasMore),
  });
}

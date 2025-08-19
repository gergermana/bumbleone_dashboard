import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getAllGenres, getAllStudios, getAnimes } from "@/features/animes/animes-api";

import AnimesWrapper from "@/features/animes/AnimesWrapper";
import { ANIME_DEFAULT_PARAMS } from "@/features/animes/config/anime-config";

export default async function Animes({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
  const queryClient = new QueryClient();
  const params = await searchParams;

  const page = parseInt(params.page ?? ANIME_DEFAULT_PARAMS.page);
  const limit = parseInt(params.limit ?? ANIME_DEFAULT_PARAMS.limit);
  const search = params.search ?? ANIME_DEFAULT_PARAMS.search;
  const sorting = params.sorting ?? ANIME_DEFAULT_PARAMS.sorting;
  const animeType = params.animeType ?? ANIME_DEFAULT_PARAMS.animeType;
  const animeStatus = params.animeStatus ?? ANIME_DEFAULT_PARAMS.animeStatus;

  await queryClient.prefetchQuery({
    queryKey: ['animes', page, limit, search, sorting, animeType, animeStatus],
    queryFn: () => getAnimes(page, limit, search, sorting, animeType, animeStatus),
    staleTime: 1000 * 60 * 5,
  });

  await queryClient.prefetchQuery({
    queryKey: ['allGenres'],
    queryFn: getAllGenres,
    staleTime: 1000 * 60 * 5,
  });

  await queryClient.prefetchQuery({
    queryKey: ['allStudios'],
    queryFn: getAllStudios,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <AnimesWrapper/>
          </div>
        </div>
      </div>
    </HydrationBoundary>
    
  );
}

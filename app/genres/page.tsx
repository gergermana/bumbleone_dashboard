import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getGenres } from "@/features/genres/api/genre";

import GenresPageWrapper from "../../features/genres/GenresPageWrapper";
import { GENRE_DEFAULT_PARAMS } from "@/configs/genre-config";

export default async function Animes({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {
  const queryClient = new QueryClient();
  const params = await searchParams;

  const page = parseInt(params.page ?? GENRE_DEFAULT_PARAMS.page);
  const limit = parseInt(params.limit ?? GENRE_DEFAULT_PARAMS.limit);
  const search = params.search ?? GENRE_DEFAULT_PARAMS.search;
  const sorting = params.sorting ?? GENRE_DEFAULT_PARAMS.sorting;

  await queryClient.prefetchQuery({
    queryKey: ['genres', page, limit, search, sorting],
    queryFn: () => getGenres(page, limit, search, sorting),
    staleTime: 1000 * 60 * 5,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <GenresPageWrapper/>
          </div>
        </div>
      </div>
    </HydrationBoundary>
    
  );
}

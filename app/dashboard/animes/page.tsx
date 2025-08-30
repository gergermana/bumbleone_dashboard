import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

import AnimesWrapper from "@/features/animes/components/wrapper";
import { animeDefaultParams } from "@/features/animes/config/constants";
import { animeQueryOptions } from "@/features/animes/api/anime-queries";

export default async function Animes({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
    const queryClient = new QueryClient();
    const params = await searchParams;

    const page = parseInt(params.page ?? animeDefaultParams.page);
    const limit = parseInt(params.limit ?? animeDefaultParams.limit);
    const search = params.search ?? animeDefaultParams.search;
    const sorting = params.sorting ?? animeDefaultParams.sorting;
    const animeType = params.animeType ?? animeDefaultParams.animeType;
    const animeStatus = params.animeStatus ?? animeDefaultParams.animeStatus;

    await queryClient.prefetchQuery(animeQueryOptions.all());
    // await queryClient.prefetchQuery({
    //     queryKey: ['allGenres'],
    //     queryFn: getAllGenres,
    //     staleTime: 1000 * 60 * 5,
    // });

    // await queryClient.prefetchQuery({
    //     queryKey: ['allStudios'],
    //     queryFn: getAllStudios,
    //     staleTime: 1000 * 60 * 5,
    // });

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

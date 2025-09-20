import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

import AnimeWrapper from "@/features/animes/components/AnimeWrapper";
import { DEFAULT_ANIME_PARAMS } from "@/features/animes/config/animeConstants";
import { animeQueryOptionsServer } from "@/features/animes/api/animeQueries";

export default async function Animes() {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        ...animeQueryOptionsServer.all(DEFAULT_ANIME_PARAMS),
    });
    
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <div className="flex flex-1 flex-col">
                <div className="@container/main flex flex-1 flex-col gap-2">
                    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                        <AnimeWrapper/>
                    </div>
                </div>
            </div>
        </HydrationBoundary>
        
    );
}

import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

import AnimeWrapper from "@/features/animes/components/AnimeWrapper";

export default async function Animes({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
    const queryClient = new QueryClient();

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

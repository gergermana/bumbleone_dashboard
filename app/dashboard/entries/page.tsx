import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { EntryWrapper, entryQueryOptionsServer, DEFAULT_ENTRY_PARAMS } from "@/features/entries";

export default async function Entries() {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        ...entryQueryOptionsServer.all(DEFAULT_ENTRY_PARAMS),
    });
    
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <div className="flex flex-1 flex-col">
                <div className="@container/main flex flex-1 flex-col gap-2">
                    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                        <EntryWrapper/>
                    </div>
                </div>
            </div>
        </HydrationBoundary>
        
    );
}

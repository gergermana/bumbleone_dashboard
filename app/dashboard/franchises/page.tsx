import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { FranchiseWrapper, franchiseQueryOptionsServer, DEFAULT_FRANCHISE_PARAMS } from "@/features/franchises";

export default async function Franchises() {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        ...franchiseQueryOptionsServer.all(DEFAULT_FRANCHISE_PARAMS),
    });
    
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <div className="flex flex-1 flex-col">
                <div className="@container/main flex flex-1 flex-col gap-2">
                    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                        <FranchiseWrapper/>
                    </div>
                </div>
            </div>
        </HydrationBoundary>
        
    );
}

import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { DEFAULT_FRANCHISE_PARAMS, FranchiseDetailWrapper, franchiseQueryOptionsServer } from "@/features/franchises";

export default async function FranchiseDetail({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        ...franchiseQueryOptionsServer.detail(slug)
    });

    await queryClient.prefetchQuery({
        ...franchiseQueryOptionsServer.entries(slug, DEFAULT_FRANCHISE_PARAMS)
    })

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <div className="flex flex-1 flex-col">
                <div className="@container/main flex flex-1 flex-col gap-2">
                    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                        <FranchiseDetailWrapper slug={slug}/>
                    </div>
                </div>
            </div>
        </HydrationBoundary>
    );
}
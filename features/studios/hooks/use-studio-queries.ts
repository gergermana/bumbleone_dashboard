import { useQuery } from "@tanstack/react-query"
import { studioQueryOptions } from "../api/studio-queries"
import { useProfile } from "@/hooks/use-profile";

export const useStudio = (filters?: any, options?: { enabled?: boolean }) => {
    const { isAutheticated, isLoading } = useProfile();

    const shouldFetch = (options?.enabled ?? true) && isAutheticated && !isLoading;

    return useQuery({
        ...studioQueryOptions.all(filters),
        enabled: shouldFetch,
    });
}
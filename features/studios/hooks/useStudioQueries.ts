import { useQuery } from "@tanstack/react-query"
import { studioQueryOptions } from "../api/studioQueries"
import { useProfile } from "@/hooks/useProfile";

export const useStudio = (filters?: any, options?: { enabled?: boolean }) => {
    const { isAutheticated, isLoading } = useProfile();

    const shouldFetch = (options?.enabled ?? true) && isAutheticated && !isLoading;

    return useQuery({
        ...studioQueryOptions.all(filters),
        enabled: shouldFetch,
    });
}
import { useQuery } from "@tanstack/react-query";
import { animeQueryOptions } from "../api/animeQueries";
import { useProfile } from "@/hooks/useProfile";

export const useAnime = (filters?: any, options?: { enabled?: boolean, }) => {
    const { isAutheticated, isLoading } = useProfile();

    const shouldFetch = (options?.enabled ?? true) && isAutheticated && !isLoading;

    return useQuery({
        ...animeQueryOptions.all(filters),
        enabled: shouldFetch,
    });
}

export const useAnimeDetail = (id: string, options?: { enabled?: boolean }) => {
    const { isAutheticated, isLoading } = useProfile();

    const shouldFetch = (options?.enabled ?? true) && isAutheticated && !isLoading;

    return useQuery({
        ...animeQueryOptions.detail(id),
        enabled: shouldFetch,
    });
}
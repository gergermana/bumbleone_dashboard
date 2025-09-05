import { useProfile } from "@/hooks/use-profile"
import { useQuery } from "@tanstack/react-query";
import { genreQueryOptions } from "../api/genre-queries";

export const useGenre = (filters?: any, options?: { enabled?: boolean }) => {
    const { isAutheticated, isLoading } = useProfile();

    const shouldFetch = (options?.enabled ?? true) && isAutheticated && !isLoading;

    return useQuery({
        ...genreQueryOptions.all(filters),
        enabled: shouldFetch,
    });
}

export const useGenreDetail = (id: string, options?: { enabled?: boolean }) => {
    const { isAutheticated, isLoading } = useProfile();

    const shouldFetch = (options?.enabled ?? true) && isAutheticated && !isLoading;

    return useQuery({
        ...genreQueryOptions.detail(id),
        enabled: shouldFetch,
    });
}
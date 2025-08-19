import { useQuery } from "@tanstack/react-query";
import { getGenres } from "./genres-api";

export const useGenres = (page: number, limit: number, search: string, sorting: string) => {
    return useQuery({
        queryKey: ['genres', page, limit, search, sorting],
        queryFn: () => getGenres(page, limit, search, sorting),
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
}
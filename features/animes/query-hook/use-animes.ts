import { useQuery } from "@tanstack/react-query";
import { getAllGenres, getAllStudios, getAnimes } from "../api/anime";

export const useAnimes = (page: number, limit: number, search: string, sorting: string, animeType: string, animeStatus: string) => {
    return useQuery({
        queryKey: ['animes', page, limit, search, sorting, animeType, animeStatus],
        queryFn: () => getAnimes(page, limit, search, sorting, animeType, animeStatus),
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
}

export const useAllGenres = () => {
    return useQuery({
        queryKey: ['allGenres'],
        queryFn: getAllGenres,
        staleTime: 1000 * 60 * 5,
    })
}

export const useAllStudios = () => {
    return useQuery({
        queryKey: ['allStudios'],
        queryFn: getAllStudios,
        staleTime: 1000 * 60 * 5,
    })
}
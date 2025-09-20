import { useQuery } from "@tanstack/react-query";
import { animeQueryOptionsClient } from "../api/animeQueries";
import { useProfile } from "@/hooks/useProfile";

export const useAnime = (filters?: any, options?: { enabled?: boolean, }) => {
    return useQuery({
        ...animeQueryOptionsClient.all(filters),
        enabled: options?.enabled ?? true,
    });
}

export const useAnimeDetail = (id: string, options?: { enabled?: boolean }) => {
    return useQuery({
        ...animeQueryOptionsClient.detail(id),
        enabled: options?.enabled ?? true,
    });
}
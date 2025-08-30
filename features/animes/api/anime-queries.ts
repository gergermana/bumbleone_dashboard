import { animeApi } from "./anime-api";

export const animeQueryKeys = {
    all: ['animes'] as const,
    lists: () => [...animeQueryKeys.all, 'list'] as const,
    list: (filters: any) => [...animeQueryKeys.lists(), { filters }] as const,
    details: () => [...animeQueryKeys.all, 'detail'] as const,
    detail: (id: string) => [...animeQueryKeys.details(), id] as const,
}

export const animeQueryOptions = {
    all: (filters?: any) => ({
        queryKey: animeQueryKeys.list(filters || {}),
        queryFn: () => animeApi.getAll(filters),
        staleTime: 5 * 60 * 1000 // 5 minutes
    }),

    detail: (id: string) => ({
        queryKey: animeQueryKeys.detail(id),
        queryFn: () => animeApi.getById(id),
        staleTime: 5 * 60 * 1000 // 5 minutes
    }),
}
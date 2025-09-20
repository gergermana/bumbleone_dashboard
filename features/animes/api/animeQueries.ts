import { animeApiClient, animeApiServer } from "./animeApi";

export const animeQueryKeys = {
    all: ['animes'] as const,
    lists: () => [...animeQueryKeys.all, 'list'] as const,
    list: (filters: any) => [...animeQueryKeys.lists(), { filters }] as const,
    details: () => [...animeQueryKeys.all, 'detail'] as const,
    detail: (id: string) => [...animeQueryKeys.details(), id] as const,
}

export const animeQueryOptionsClient = {
    all: (filters?: any) => ({
        queryKey: animeQueryKeys.list(filters || {}),
        queryFn: () => animeApiClient.getAll(filters),
        staleTime: 5 * 60 * 1000 // 5 minutes
    }),

    detail: (id: string) => ({
        queryKey: animeQueryKeys.detail(id),
        queryFn: () => animeApiClient.getById(id),
        staleTime: 5 * 60 * 1000 // 5 minutes
    }),
}

export const animeQueryOptionsServer = {
    all: (filters?: any) => ({
        queryKey: animeQueryKeys.list(filters || {}),
        queryFn: () => animeApiServer.getAll(filters),
        staleTime: 5 * 60 * 1000 // 5 minutes
    }),
}
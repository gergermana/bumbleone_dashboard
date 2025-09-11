import { genreApi } from "./genreApi"

export const genreQueryKeys = {
    all: ['genres'] as const,
    lists: () => [...genreQueryKeys.all, 'list'] as const,
    list: (filters: any) => [...genreQueryKeys.lists(), { filters }] as const,
    details: () => [...genreQueryKeys.all, 'detail'] as const,
    detail: (id: string) => [...genreQueryKeys.details(), id] as const,
}

export const genreQueryOptions = {
    all: (filters?: any) => ({
        queryKey: genreQueryKeys.list(filters || {}),
        queryFn: () => genreApi.getAll(filters),
        staleTime: 5 * 60 * 1000
    }),

    detail: (id: string) => ({
        queryKey: genreQueryKeys.detail(id),
        queryFn: () => genreApi.getById(id),
        staleTime: 5 * 60 * 1000
    }),
}
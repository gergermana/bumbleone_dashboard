import { studioApi } from "./studioApi"

export const studioQueryKeys = {
    all: ['studios'] as const,
    lists: () => [...studioQueryKeys.all, 'list'] as const,
    list: (filters: any) => [...studioQueryKeys.lists(), { filters }] as const,
    details: () => [...studioQueryKeys.all, 'detail'] as const,
    detail: (id: string) => [...studioQueryKeys.details(), id] as const,
}

export const studioQueryOptions = {
    all: (filters?: any) => ({
        queryKey: studioQueryKeys.list(filters || {}),
        queryFn: () => studioApi.getAll(filters),
        staleTime: 5 * 60 * 1000,
    }),

    detail: (id: string) => ({
        queryKey: studioQueryKeys.detail(id),
        queryFn: () => studioApi.getById(id),
        staleTime: 5 * 60 * 1000,
    }),
}
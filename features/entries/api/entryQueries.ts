import { entryApiClient, entryApiServer } from "./entryApi";

export const entryQueryKeys = {
    all: ['entries'] as const,
    lists: () => [...entryQueryKeys.all, 'list'] as const,
    list: (filters: any) => [...entryQueryKeys.lists(), { filters }] as const,
    details: () => [...entryQueryKeys.all, 'detail'] as const,
    detail: (id: string) => [...entryQueryKeys.details(), id] as const,
}

export const entryQueryOptionsClient = {
    all: (filters?: any) => ({
        queryKey: entryQueryKeys.list(filters || {}),
        queryFn: () => entryApiClient.getAll(filters),
        staleTime: 5 * 60 * 1000 // 5 minutes
    }),

    detail: (id: string) => ({
        queryKey: entryQueryKeys.detail(id),
        queryFn: () => entryApiClient.getById(id),
        staleTime: 5 * 60 * 1000 // 5 minutes
    }),
}

export const entryQueryOptionsServer = {
    all: (filters?: any) => ({
        queryKey: entryQueryKeys.list(filters || {}),
        queryFn: () => entryApiServer.getAll(filters),
        staleTime: 5 * 60 * 1000 // 5 minutes
    }),
}
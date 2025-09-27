import { franchiseApiClient, franchiseApiServer } from "./franchiseApi"

export const franchiseQueryKeys = {
    all: ['franchises'] as const,
    lists: () => [...franchiseQueryKeys.all, 'list'] as const,
    list: (filters: any) => [...franchiseQueryKeys.lists(), { filters }] as const,
    details: () => [...franchiseQueryKeys.all, 'detail'] as const,
    detail: (id: string) => [...franchiseQueryKeys.details(), id] as const,
    entries: (id: string, filters: any) => [...franchiseQueryKeys.detail(id), 'entries', { filters }] as const,
}

export const franchiseQueryOptionsClient = {
    all: (filters?: any) => ({
        queryKey: franchiseQueryKeys.list(filters || {}),
        queryFn: () => franchiseApiClient.getAll(filters),
        staleTime: 5 * 60 * 1000
    }),

    detail: (id: string) => ({
        queryKey: franchiseQueryKeys.detail(id),
        queryFn: () => franchiseApiClient.getById(id),
        staleTime: 5 * 60 * 1000
    }),

    entries: (id: string, filters?: any) => ({
        queryKey: franchiseQueryKeys.entries(id, filters || {}),
        queryFn: () => franchiseApiClient.getEntriesById(id, filters),
        staleTime: 5 * 60 * 1000
    }),
}

export const franchiseQueryOptionsServer = {
    all: (filters?: any) => ({
        queryKey: franchiseQueryKeys.list(filters || {}),
        queryFn: () => franchiseApiServer.getAll(filters),
        staleTime: 5 * 60 * 1000
    }),

    detail: (id: string) => ({
        queryKey: franchiseQueryKeys.detail(id),
        queryFn: () => franchiseApiServer.getById(id),
        staleTime: 5 * 60 * 1000
    }),

    entries: (id: string, filters?: any) => ({
        queryKey: franchiseQueryKeys.entries(id, filters || {}),
        queryFn: () => franchiseApiServer.getEntriesById(id, filters),
        staleTime: 5 * 60 * 1000
    }),
}
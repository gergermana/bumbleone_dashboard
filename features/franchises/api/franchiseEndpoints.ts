export const FRANCHISE_ENDPOINTS = {
    getAll: "/admin/franchises",
    getById: (id: string) => `/admin/franchises/${id}`,
    getEntriesById: (id: string) => `/admin/franchises/${id}/entries`,
    create: "/admin/franchises",
    update: (id: string) => `/admin/franchises/${id}`,
    delete: (id: string) => `/admin/franchises/${id}`,
} as const;
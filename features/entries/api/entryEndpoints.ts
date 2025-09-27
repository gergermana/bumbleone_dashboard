export const ENTRY_ENDPOINTS = {
    getAll: '/admin/entries',
    getById: (id: string) => `/admin/entries/${id}`,
    create: '/admin/entries',
    update: (id: string) => `/admin/entries/${id}`,
    delete: (id: string) => `/admin/entries/${id}`,
} as const;
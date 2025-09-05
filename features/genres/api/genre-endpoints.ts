export const GENRES_ENDPOINTS = {
    getAll: '/admin/genres',
    getById: (id: string) => `/admin/genres/${id}`,
    create: '/admin/genres',
    update: (id: string) => `/admin/genres/${id}`,
    delete: (id: string) => `/admin/genres/${id}`,
} as const;
export const STUDIO_ENDPOINTS = {
    getAll: '/admin/studios',
    getById: (id: string) => `/admin/studios/${id}`,
    create: '/admin/studios',
    update: (id: string) => `/admin/studios/${id}`,
    delete: (id: string) => `/admin/studios/${id}`,
} as const;
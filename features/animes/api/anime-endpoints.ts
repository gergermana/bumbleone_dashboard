export const ANIME_ENDPOINTS = {
    getAll: '/admin/animes',
    getById: (id: string) => `/admin/animes/${id}`,
    create: '/admin/animes',
    update: (id: string) => `/admin/animes/${id}`,
    delete: (id: string) => `/admin/animes/${id}`,
} as const;
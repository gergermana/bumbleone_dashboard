export const ANIME_ENDPOINTS = {
    getAll: '/animes',
    getById: (id: string) => `/animes/${id}`,
    create: '/animes',
    update: (id: string) => `/animes/${id}`,
    delete: (id: string) => `/animes/${id}`,
} as const;
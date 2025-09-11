import api from "@/lib/api";
import { ANIME_ENDPOINTS } from "./animeEndpoints";

export const animeApi = {
    getAll: async (params: any) => {
        const response = await api.get(ANIME_ENDPOINTS.getAll, { params });
        return response.data;
    },

    getById: async (id: string) => {
        const response = await api.get(ANIME_ENDPOINTS.getById(id));
        return response.data;
    },

    create: async (data: any) => {
        const response = await api.post(ANIME_ENDPOINTS.create, data);
        return response.data;
    },

    update: async (id: string, data: any) => {
        const response = await api.patch(ANIME_ENDPOINTS.update(id), data);
        return response.data;
    },

    delete: async (id: string) => {
        const response = await api.delete(ANIME_ENDPOINTS.delete(id));
        return response.data;
    },
}
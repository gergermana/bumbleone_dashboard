import api from "@/lib/api";
import { GENRE_ENDPOINTS } from "./genreEndpoints";

export const genreApi = {
    getAll: async (params: any) => {
        const response = await api.get(GENRE_ENDPOINTS.getAll, { params });
        return response.data;
    },

    getById: async (id: string) => {
        const response = await api.get(GENRE_ENDPOINTS.getById(id));
        return response.data;
    },

    create: async (data: any) => {
        const response = await api.post(GENRE_ENDPOINTS.create, data);
        return response.data; 
    },

    update: async (id: string, data: any) => {
        const response = await api.patch(GENRE_ENDPOINTS.update(id), data);
        return response.data;
    },

    delete: async (id: string) => {
        const response = await api.delete(GENRE_ENDPOINTS.delete(id));
        return response.data;
    },
}
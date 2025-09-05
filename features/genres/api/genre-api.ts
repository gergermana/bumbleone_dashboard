import api from "@/lib/api";
import { GENRES_ENDPOINTS } from "./genre-endpoints";

export const genreApi = {
    getAll: async (params: any) => {
        const response = await api.get(GENRES_ENDPOINTS.getAll, { params });
        return response.data;
    },

    getById: async (id: string) => {
        const response = await api.get(GENRES_ENDPOINTS.getById(id));
        return response.data;
    },

    create: async (data: any) => {
        const response = await api.post(GENRES_ENDPOINTS.create, data);
        return response.data; 
    },

    update: async (id: string, data: any) => {
        const response = await api.patch(GENRES_ENDPOINTS.update(id), data);
        return response.data;
    },

    delete: async (id: string) => {
        const response = await api.delete(GENRES_ENDPOINTS.delete(id));
        return response.data;
    },
}
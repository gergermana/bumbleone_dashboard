import api from "@/lib/api"
import { STUDIO_ENDPOINTS } from "./studio-endpoints"

export const studioApi = {
    getAll: async (params: any) => {
        const response = await api.get(STUDIO_ENDPOINTS.getAll, { params });
        return response.data;
    },

    getById: async (id: string) => {
        const response = await api.get(STUDIO_ENDPOINTS.getById(id));
        return response.data;
    },

    create: async (data: any) => {
        const response = await api.post(STUDIO_ENDPOINTS.create, data);
        return response.data;
    },

    update: async (id: string, data: any) => {
        const response = await api.patch(STUDIO_ENDPOINTS.update(id), data);
        return response.data;
    },

    delete: async (id: string) => {
        const response = await api.delete(STUDIO_ENDPOINTS.delete(id));
        return response.data;
    },
}
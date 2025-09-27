import { clientApi } from "@/lib/api/clientApi";
import { ENTRY_ENDPOINTS } from "./entryEndpoints";
import { serverFetch } from "@/lib/api/serverApi";
import { toQueryString } from "@/lib/querystring";
import { z } from "zod";
import { EntrySchema } from "../validations/entrySchema";

export type EntryListResponse = {
    datalist: z.infer<typeof EntrySchema>[];
    total: number;
};

export const entryApiClient = {
    getAll: async (params: any) => {
        const response = await clientApi.get(ENTRY_ENDPOINTS.getAll, { params });
        return response.data;
    },

    getById: async (id: string) => {
        const response = await clientApi.get(ENTRY_ENDPOINTS.getById(id));
        return response.data;
    },

    create: async (data: any) => {
        const response = await clientApi.post(ENTRY_ENDPOINTS.create, data);
        return response.data;
    },

    update: async (id: string, data: any) => {
        const response = await clientApi.patch(ENTRY_ENDPOINTS.update(id), data);
        return response.data;
    },

    delete: async (id: string) => {
        const response = await clientApi.delete(ENTRY_ENDPOINTS.delete(id));
        return response.data;
    },
}

export const entryApiServer = {
    getAll: async (params: any): Promise<EntryListResponse>  => {
        const query = params ? `?${toQueryString(params)}` : "";
        return serverFetch(`${ENTRY_ENDPOINTS.getAll}${query}`);
    },
}
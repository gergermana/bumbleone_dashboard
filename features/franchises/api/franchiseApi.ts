import { serverFetch } from "@/lib/api/serverApi";
import { toQueryString } from "@/lib/querystring"
import { FRANCHISE_ENDPOINTS } from "./franchiseEndpoints";
import { clientApi } from "@/lib/api/clientApi";

import { FranchiseCreateType } from "../validations/franchiseCreateSchema";
import { FranchiseUpdateType } from "../validations/franchiseUpdateSchema";

export const franchiseApiClient = {
    getAll: async (params?: any) => {
        const response = await clientApi.get(FRANCHISE_ENDPOINTS.getAll, { params });
        return response.data;
    },

    getById: async (id: string) => {
        const response = await clientApi.get(FRANCHISE_ENDPOINTS.getById(id));
        return response.data; 
    },

    getEntriesById: async (id: string, params?: any) => {
        const response = await clientApi.get(FRANCHISE_ENDPOINTS.getEntriesById(id), { params });
        return response.data; 
    },

    create: async (data: FranchiseCreateType) => {
        const response = await clientApi.post(FRANCHISE_ENDPOINTS.create, data);
        return response.data;
    },

    update: async (id: string, data: FranchiseUpdateType) => {
        const response = await clientApi.patch(FRANCHISE_ENDPOINTS.update(id), data);
        return response.data;
    }
}

export const franchiseApiServer = {
    getAll: async (params?: any) => {
        const query = params ? `?${toQueryString(params)}` : "";
        return serverFetch(`${FRANCHISE_ENDPOINTS.getAll}${query}`);
    },

    getById: async (id: string) => {
        return serverFetch(`${FRANCHISE_ENDPOINTS.getById(id)}`); 
    },

    getEntriesById: async (id: string, params?: any) => {
        const query = params ? `?${toQueryString(params)}` : "";
        return serverFetch(`${FRANCHISE_ENDPOINTS.getEntriesById(id)}${query}`);
    },
}
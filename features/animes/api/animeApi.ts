import { clientApi } from "@/lib/api/clientApi";
import { ANIME_ENDPOINTS } from "./animeEndpoints";
import { serverFetch } from "@/lib/api/serverApi";
import { toQueryString } from "@/lib/querystring";
import { z } from "zod/v3";
import { AnimeSchema } from "../validations/animeSchema";

export type AnimeListResponse = {
  datalist: z.infer<typeof AnimeSchema>[];
  total: number;
};

export const animeApiClient = {
    getAll: async (params: any) => {
        const response = await clientApi.get(ANIME_ENDPOINTS.getAll, { params });
        return response.data;
    },

    getById: async (id: string) => {
        const response = await clientApi.get(ANIME_ENDPOINTS.getById(id));
        return response.data;
    },

    create: async (data: any) => {
        const response = await clientApi.post(ANIME_ENDPOINTS.create, data);
        return response.data;
    },

    update: async (id: string, data: any) => {
        const response = await clientApi.patch(ANIME_ENDPOINTS.update(id), data);
        return response.data;
    },

    delete: async (id: string) => {
        const response = await clientApi.delete(ANIME_ENDPOINTS.delete(id));
        return response.data;
    },
}

export const animeApiServer = {
    getAll: async (params: any): Promise<AnimeListResponse>  => {
        const query = params ? `?${toQueryString(params)}` : "";
        return serverFetch(`${ANIME_ENDPOINTS.getAll}${query}`);
    },
}
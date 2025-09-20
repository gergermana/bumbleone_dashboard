import api from "@/lib/api";
import { AUTH_ENDPOINTS } from "./authEndpoints";

const API_URL = process.env.NEXT_PUBLIC_API_KEY;

export const authClientApi = {
    login: async (credentials: any) => {
        const response = await api.post(AUTH_ENDPOINTS.login, credentials);
        return response.data;
    },

    logout: async () => {
        await api.post(AUTH_ENDPOINTS.logout);
    },

    refresh: async () => {
        // Client refresh
    },

    getProfile: async () => {
        const response = await api.get(AUTH_ENDPOINTS.getProfile);
        return response.data;
    },
}

export const authServerApi = {
    refresh: async (refreshToken: string) => {
        try {
            const res = await fetch(`${API_URL}${AUTH_ENDPOINTS.refresh}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    ...(refreshToken ? { 'Cookie': `refresh_token=${refreshToken}` } : {}),
                },
            })

            if (!res.ok) {
                throw new Error('Token refresh failed')
            }

            const data = await res.json();
            return {
                access_token: data.access_token,
                refresh_token: data.refresh_token,
            }
        } catch (error) {
            console.error('Token refresh error:', error)
            return null
        }
    }
}
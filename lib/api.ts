import { clearCredentials, setCredentials } from '@/store/slices/authSlice';
import { store } from '@/store/store';
import axios from 'axios';
import { toast } from 'sonner';

const publicEndpoints = ['/auth/login'];
const apiBaseUrl = process.env.NEXT_PUBLIC_API_KEY;

const api = axios.create({
    baseURL: `${apiBaseUrl}`,
    withCredentials: true,
});

let routerInstance = null;

export const setRouterInstance = (router: any) => {
    routerInstance = router;
}

api.interceptors.request.use(
    (config) => {
        const token = store.getState().auth.accessToken;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response, // Directly return successful responses.
    async error => {
        const originalRequest = error.config;

        if (publicEndpoints.some(endpoint => originalRequest?.url?.includes(endpoint))) {
            return Promise.reject(error);
        }

        if (error.response?.status === 401 && !originalRequest?._retry) {
            originalRequest._retry = true; // Mark the request as retried to avoid infinite loops.

            try {
                const res = await axios.post(`${apiBaseUrl}/auth/refresh`, {}, { 
                    withCredentials: true 
                });

                const { accessToken, user } = res.data;
                
                store.dispatch(setCredentials({
                    accessToken: accessToken,
                    user,
                }));

                if (originalRequest) {
                    originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                    return api.request(originalRequest);
                }
            } catch (refreshError) {
                store.dispatch(clearCredentials());
                
                const code = error.response.data.code;
                const message = error.response.data.message;
                
                if (code && ['INVALID_REFRESH_TOKEN', 'NO_REFRESH_TOKEN', 'REFRESH_TOKEN_EXPIRED', 'REFRESH_TOKEN_REUSE'].includes(code)) {
                    toast.error(message);
                }

                if (window.location.pathname !== '/login') {
                    routerInstance.push('/login');
                }
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default api;
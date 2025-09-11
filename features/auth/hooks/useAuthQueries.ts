import { useQuery } from "@tanstack/react-query";
import { authApi } from "../api/authApi";

export const useAuthCheck = () => {
    return useQuery({
        queryKey: ['auth-check'],
        queryFn: authApi.refresh,
        retry: false,
        refetchOnWindowFocus: false,
        staleTime: Infinity,
    });
}

export const useUserProfile = () => {
    return useQuery({
        queryKey: ['user', 'profile'],
        queryFn: authApi.getProfile,
        staleTime: 5 * 60 * 1000, // 5 minutes
        enabled: false,
    })
}
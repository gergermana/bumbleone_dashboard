import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux"
import { authApi } from "../api/auth-api";
import { clearCredentials, setCredentials, setLoading } from "@/store/slices/authSlice";

export const useAuthCheck = () => {
    const dispatch = useDispatch();

    return useQuery({
        queryKey: ['auth-check'],
        queryFn: authApi.refresh,
        retry: false,
        refetchOnWindowFocus: false,
        staleTime: Infinity,
        // meta: {
        //     onSuccess: (data: any) => {
        //         dispatch(setCredentials({
        //             accessToken: data.accessToken,
        //             user: data.user,
        //         }));
        //         console.log("Refresh Success", data);
        //     },
        //     onError: () => {
        //         dispatch(clearCredentials());
        //     },
        //     onSettled: () => {
        //         dispatch(setLoading(false));
        //     },
        // },
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
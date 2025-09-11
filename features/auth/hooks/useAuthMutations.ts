import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "../api/authApi";
import { useDispatch } from "react-redux";
import { clearCredentials, setCredentials } from "@/store/slices/authSlice";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const useLogin = () => {
    const dispatch = useDispatch();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: authApi.login,
        onSuccess: (data) => {
            dispatch(setCredentials({
                accessToken: data.accessToken,
                user: data.user,
            }));
            
            toast.error(`Login Successfull, Welcome ${data.user.username}!!`);

            queryClient.invalidateQueries({ queryKey: ['user'] });
        },
        onError: (error: AxiosError<any>) => {
            if (error?.response?.data.code === 'INVALID_CREDENTIALS') {
                toast.error(error?.response?.data.message);
            }
        },
    });
}

export const useLogout = () => {
    const dispatch = useDispatch();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: authApi.logout,
        onSuccess: () => {
            dispatch(clearCredentials());
            queryClient.clear();
        },
        onError: (error) => {
            dispatch(clearCredentials());
            queryClient.clear();
        },
    });
}
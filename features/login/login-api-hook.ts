import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { login, profile } from "./login-api";

export const useLogin = () => {
    return useMutation({
        mutationFn: (params: any) => login(params),
        onError: (error) => {
            console.log(error);
        },
        onSuccess: (data) => {
            console.log("Successfully logged in");
            console.log(data);
        }
    });
}

export const useProfile = () => {
    return useQuery({
        queryKey: ['profile'],
        queryFn: profile,
    });
}
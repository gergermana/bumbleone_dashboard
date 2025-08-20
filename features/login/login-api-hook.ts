import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "./login-api";

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
import { useMutation } from "@tanstack/react-query";
import { login } from "./login-api";

export const useLogin = () => {
    return useMutation({
        mutationFn: (params: any) => login(params),
    });
}
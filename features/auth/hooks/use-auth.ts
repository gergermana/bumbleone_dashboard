import { RootState } from "@/store/store"
import { useAppSelector } from "@/store/store-hook"
import { useLogin, useLogout } from "./use-auth-mutations";

export const useAuth = () => {
    const { accessToken, user, isAutheticated, isLoading } = useAppSelector(
        (state: RootState) => state.auth
    );

    const loginMutation = useLogin();
    const logoutMutation = useLogout();

    return {
        accessToken,
        user,
        isAutheticated,
        isLoading,

        login: loginMutation.mutateAsync,
        logout: logoutMutation.mutateAsync,

        isLoggingIn: loginMutation.isPending,
        isLoggingOut: logoutMutation.isPending,

        loginError: loginMutation.error,
        logoutError: logoutMutation.error,
    }
}
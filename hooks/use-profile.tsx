import { RootState } from "@/store/store";
import { useAppSelector } from "@/store/store-hook"

export const useProfile = () => {
    const { accessToken, user, isAutheticated, isLoading } = useAppSelector(
        (state: RootState) => state.auth
    );

    return {
        accessToken,
        user,
        isAutheticated,
        isLoading,
    }
}
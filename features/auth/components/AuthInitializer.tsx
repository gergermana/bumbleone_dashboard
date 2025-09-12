'use client';

import { useEffect } from "react";
import { useAuthCheck } from "../hooks/useAuthQueries";
import { useAppDispatch } from "@/store/store-hook";
import { setCredentials } from "@/store/slices/authSlice";
import { useRouter } from "nextjs-toploader/app";

export function AuthInitializer() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { data, isLoading, isError } = useAuthCheck();
    
    useEffect(() => {
        if (!isLoading && !isError && data) {
            dispatch(setCredentials({
                accessToken: data.accessToken,
                user: data.user,
            }));
        }
    }, [data, isLoading, isError, dispatch])

    useEffect(() => {
        if (isError) {
            if (window.location.pathname !== '/login') {
                router.push('/login');
            }
        }
    }, [isError, router]);
    
    return null;
}
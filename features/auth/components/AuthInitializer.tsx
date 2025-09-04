'use client';

import { useEffect } from "react";
import { useAuthCheck } from "../hooks/use-auth-queries";
import { useAppDispatch } from "@/store/store-hook";
import { setCredentials } from "@/store/slices/authSlice";

export function AuthInitializer() {
    const dispatch = useAppDispatch();
    const { data, isLoading, isError } = useAuthCheck();
    
    useEffect(() => {
        if (!isLoading && !isError && data) {
            dispatch(setCredentials({
                accessToken: data.accessToken,
                user: data.user,
            }));
        }
    }, [data, isLoading, isError, dispatch])
    
    return null;
}
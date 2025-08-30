'use client';

import { useEffect } from "react";
import { useAuthCheck } from "../hooks/use-auth-queries";
import { useAppDispatch } from "@/store/store-hook";
import { clearCredentials, setCredentials } from "@/store/slices/authSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

export function AuthInitializer() {
    const dispatch = useDispatch();
    const router = useRouter();
    const { data, isLoading, isError } = useAuthCheck();
    
    useEffect(() => {
        if (!isLoading && !isError && data) {
            dispatch(setCredentials({
                accessToken: data.accessToken,
                user: data.user,
            }));
        } else {
            // dispatch(clearCredentials());
            // router.push('/login');
        }
    }, [data, isLoading, isError, dispatch])
    
    return null;
}
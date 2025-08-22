"use client";

import { useProfile } from "@/features/login/login-api-hook";
import { useAppDispatch } from "@/store/store-hook";
import { useEffect } from "react";
import { setUser } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";

export default function AuthLoader() {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const { data, isLoading } = useProfile();

    useEffect(() => {
        if (data) {
            console.log(data);
            dispatch(setUser(data));
            router.replace('/');
        } else {
            router.replace('/login');
        }
    }, [data, dispatch]);

    if (isLoading) {
        console.log("loading auth");
    }

    return null;
}
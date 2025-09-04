"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { getQueryClient } from "./get-query-client";
import { useRouter } from "nextjs-toploader/app";

import NextTopLoader from 'nextjs-toploader';
import { useEffect } from "react";
import { setRouterInstance } from "@/lib/api";

export default function Provider({ children }: { children: React.ReactNode }) {
    const queryClient = getQueryClient();
    const router = useRouter();

    useEffect(() => {
        setRouterInstance(router);
    }, [router]);

    return (
        <QueryClientProvider client={queryClient}>
            <NextTopLoader
                color="#ffffff"
                showSpinner={false}
                height={2}
            />
            {children}
        </QueryClientProvider>
    );
}
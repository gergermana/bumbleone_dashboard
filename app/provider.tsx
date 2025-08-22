"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { getQueryClient } from "./get-query-client";

import NextTopLoader from 'nextjs-toploader';

export default function Provider({ children }: { children: React.ReactNode }) {
    const queryClient = getQueryClient();
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
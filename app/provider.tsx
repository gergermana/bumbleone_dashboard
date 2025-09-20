"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { getQueryClient } from "./get-query-client";
import { useRouter } from "nextjs-toploader/app";

import NextTopLoader from 'nextjs-toploader';
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { ThemeProvider } from "@/components/ThemeProvider";
import ReduxProvider from "@/store/redux-provider";
import { Toaster } from "@/components/ui/sonner";

function TopLoaderBasedOnTheme() {
    const { theme, systemTheme } = useTheme();
    const [color, setColor] = useState('#000000');

    useEffect(() => {
        const currentTheme = theme === "system" ? systemTheme : theme;
        if (currentTheme === 'dark') {
            setColor('#ffffff');
        } else {
            setColor('#000000');
        }
    }, [theme, systemTheme]);

    return <NextTopLoader color={color} showSpinner={false} height={2} />;
}

export default function Provider({ children }: { children: React.ReactNode }) {
    const queryClient = getQueryClient();
    const router = useRouter();

    return (
        <ReduxProvider>
            <QueryClientProvider client={queryClient}>    
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <TopLoaderBasedOnTheme />
                    {children}  
                    <Toaster position="top-center" />
                </ThemeProvider>
            </QueryClientProvider>
        </ReduxProvider>
    );
}
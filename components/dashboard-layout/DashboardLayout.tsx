"use client";

import { useAuthCheck } from "@/features/auth/hooks/useAuthQueries";
import { useAppDispatch, useAppSelector } from "@/store/store-hook";
import { setCredentials } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";
import { MyWaveLoader } from "@/components/icons/WaveLoader";
import { ReactNode, useEffect } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

import { DashboardSidebar } from "@/components/dashboard-layout/DashboardSiderbar";
import { DashboardHeader } from "@/components/dashboard-layout/DashboardHeader";

export default function DashboardLayout({ children }: { children: ReactNode }) {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const { data, isLoading, isError } = useAuthCheck();
    const { accessToken } = useAppSelector(state => state.auth);

    useEffect(() => {
        if (!isLoading && !isError && data) {
            dispatch(setCredentials({
                accessToken: data.accessToken,
                user: data.user,
            }));
        }
    }, [data, isLoading, isError, dispatch]);

    useEffect(() => {
        if (isError) {
            if (window.location.pathname !== '/login') {
                router.push('/login');
            }
        }
    }, [isError, router]);

    if (isLoading && !accessToken) {
        return (
            <SidebarProvider>
                <DashboardSidebar variant="inset" className="px-1" />
                <SidebarInset>
                    <DashboardHeader />
                    <main className="flex flex-1 flex-col gap-4 p-4 pt-0 items-center justify-center">
                        <MyWaveLoader />
                    </main>
                </SidebarInset>
            </SidebarProvider>
        );
    }
    
    if (accessToken) {
        return (
            <SidebarProvider>
                <DashboardSidebar variant="inset" className="px-1" />
                <SidebarInset>
                    <DashboardHeader />
                    <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
                        {children}
                    </main>
                </SidebarInset>
            </SidebarProvider>
        );
    }

    return null; 
}
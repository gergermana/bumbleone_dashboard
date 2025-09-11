'use client';

import { MyWaveLoader } from "@/components/icons/WaveLoader";
import { useProfile } from "@/hooks/useProfile";
import { ReactNode } from "react";

export default function AuthProvider({ children }: { children: ReactNode }) {
    const { isLoading: authLoading } = useProfile();

    if (authLoading) {
        return <MyWaveLoader/>
    }

    return <>{children}</>
}
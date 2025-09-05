"use client"

import * as React from "react"
import Link from "next/link"

import { Logo } from "../icons/Logo"
import {
    Frame,
    Gauge,
    TvMinimalPlay,
    MessageCircle,
    Shapes,
    Film,
    Map,
    PieChart,
    Settings,
} from "lucide-react"

import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar"
import { NavSecondary } from "./nav-secondary"
import { useAppSelector } from "@/store/store-hook"
import { MyWaveLoader } from "../icons/WaveLoader"
import ThemeSwitcher from "../theme-switcher"

const data = {
    navMain: [
        {
            title: "Dashboard",
            url: "/dashboard",
            icon: Gauge,
        },
        {
            title: "Animes",
            url: "/dashboard/animes",
            icon: TvMinimalPlay,
        },
        {
            title: "Comments",
            url: "/dashboard/comments",
            icon: MessageCircle,
        },
        {
            title: "Genres",
            url: "/dashboard/genres",
            icon: Shapes,
        },
        {
            title: "Studios",
            url: "/dashboard/studios",
            icon: Film,
        },
    ],
    navSecondary: [
        {
            title: "Settings",
            url: "/settings",
            icon: Settings
        }
    ],
    projects: [
        {
            name: "Design Engineering",
            url: "#",
            icon: Frame,
        },
        {
            name: "Sales & Marketing",
            url: "#",
            icon: PieChart,
        },
        {
            name: "Travel",
            url: "#",
            icon: Map,
        },
    ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const user = useAppSelector((state) => state.auth.user);
    return (
        <Sidebar collapsible="offcanvas" {...props}>
            <SidebarHeader>
                <Link href="/dashboard" className="flex justify-start w-full">
                    <Logo className="w-44 text-foreground"/>
                </Link>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                <NavSecondary items={data.navSecondary} className="mt-auto"/>
            </SidebarContent>
            <SidebarFooter>
                <NavUser/>
                <ThemeSwitcher/> 
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}

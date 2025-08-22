"use client"

import * as React from "react"
import Link from "next/link"

import { Logo } from "./Logo"
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

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
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

const data = {
    navMain: [
        {
            title: "Dashboard",
            url: "/",
            icon: Gauge,
        },
        {
            title: "Animes",
            url: "/animes",
            icon: TvMinimalPlay,
        },
        {
            title: "Comments",
            url: "/comments",
            icon: MessageCircle,
        },
        {
            title: "Genres",
            url: "/genres",
            icon: Shapes,
        },
        {
            title: "Studios",
            url: "/studios",
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
          <SidebarMenu>
            <SidebarMenuItem className="flex items-center justify-start">
                <Link href="#" className="flex items-center flex-col gap-2">
                    <Logo className="w-44 text-foreground"/>
                </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
            <NavMain items={data.navMain} />
        </SidebarContent>
        <SidebarFooter>
            <NavSecondary items={data.navSecondary} />
            <NavUser user={user} />
        </SidebarFooter>
        <SidebarRail />
    </Sidebar>
  )
}

"use client"

import * as React from "react"
import Link from "next/link"

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
import Logo from "./Logo"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
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

export const AniPlanetIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    fill="currentColor"
    {...props}
  >
    <path d="M50 4C26.8 4 8 22.8 8 46s18.8 42 42 42 42-18.8 42-42S73.2 4 50 4zm0 8c18.8 0 34 15.2 34 34S68.8 80 50 80 16 64.8 16 46 31.2 12 50 12zm39.2 17.8c-2.3-1-4.8 1-4 3.3 2.3 6.4 3.5 13.2 3.5 20.2s-1.2 13.8-3.5 20.2c-.8 2.3 1.7 4.3 4 3.3 2.3-1 3.9-3.3 4.7-5.8 2.8-8.4 4.3-17.4 4.3-26.7s-1.5-18.3-4.3-26.7c-.8-2.5-2.4-4.8-4.7-5.8z"/>
  </svg>
)



export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem className="flex items-center justify-start">
                <Link href="#">
                    <Logo className="w-40 text-primary"/>
                </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
            <NavMain items={data.navMain} />
        </SidebarContent>
        <SidebarFooter>
            <NavSecondary items={data.navSecondary} />
            <NavUser user={data.user} />
        </SidebarFooter>
        <SidebarRail />
    </Sidebar>
  )
}

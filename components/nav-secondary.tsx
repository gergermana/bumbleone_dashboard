"use client"

import Link from "next/link"
import { type LucideIcon } from "lucide-react"
import React from "react"
import { useTheme } from "next-themes"

import { Moon } from "lucide-react"

import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar"
import { Switch } from "@/components/ui/switch"

export function NavSecondary({
    items,
    ...props
}: {
    items: {
        title: string
        url: string
        icon: LucideIcon
    }[]
} & React.ComponentPropsWithRef<typeof SidebarGroup>) {
    const { theme, setTheme } = useTheme();

    return (
        <SidebarGroup {...props}>
            <SidebarGroupContent>
                <SidebarMenu>
                    {/* <SidebarMenuItem>
                        <Moon/>
                        <span>Dark Mode</span>
                        <Switch className="ml-auto" checked={theme === "dark"} onClick={() => setTheme(theme === "dark" ? "light" : "dark")}/>
                    </SidebarMenuItem> */}
                    {items.map(item => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild>
                                <Link href={item.url}>
                                    {item.icon && <item.icon/>}
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
"use client";

import { Moon, Sun } from "lucide-react";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export default function ThemeSwitcher() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    const handleThemeChange = (currentTheme: string | undefined) => {
        if (!currentTheme) return null;
        if (currentTheme === 'dark') {
            setTheme('light');
        } else {
            setTheme('dark');
        }
    }

    return (
        <Button className="w-full" size="sm" onClick={() => handleThemeChange(theme)}>
            {theme === 'dark' && <Moon className="size-5"/>}
            {theme === 'light' && <Sun className="size-5"/>}
            <span>
                {theme === 'dark' && "Dark Mode"}
                {theme === 'light' && "Light Mode"}
            </span>
        </Button>
    );
}
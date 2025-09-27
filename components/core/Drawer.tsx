"use client";

import { useIsMobile } from "@/hooks/useIsMobile";
import { LucideIcon, SquarePen, X } from "lucide-react";

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";

export default function MyDrawer({
    isOpen,
    setIsOpen,
    label,
    icon: Icon,
    content,
}: {
    isOpen: boolean,
    setIsOpen: () => void,
    label?: string,
    icon?: LucideIcon,
    content?: React.ReactNode,
}) {
    const isMobile = useIsMobile();

    return (
        <Drawer 
            direction={isMobile ? "bottom" : "right"} 
            open={isOpen} 
            onOpenChange={setIsOpen} 
            autoFocus={isOpen}
            handleOnly={isMobile ? false : true}
        >
            <DrawerContent>
                <DrawerHeader className="border-b-2 py-2">
                    <DrawerTitle className="flex justify-between items-center text-lg">
                        <div className="flex items-center gap-2">
                            {Icon && <Icon/>}
                            {label}
                        </div>
                        <DrawerClose asChild>
                            <Button size="icon" variant="ghost" className='rounded-full'>
                                <X className='size-6'/>
                            </Button>
                        </DrawerClose>
                    </DrawerTitle>
                    <DrawerDescription className='sr-only'>Edit Anime Metadata</DrawerDescription>
                </DrawerHeader>
                
                {content && content}
            </DrawerContent>
        </Drawer>
    );
}
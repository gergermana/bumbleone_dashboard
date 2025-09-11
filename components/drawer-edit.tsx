"use client"

import { useIsMobile } from "@/hooks/useIsMobile";

import { X } from "lucide-react";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "./ui/button";
import { Input } from "./ui/input";

type AppDrawerProps<TData extends { id: number }> = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    data: TData | null | undefined;
}

export function AppDrawer<TData extends { id: number }>({ 
    isOpen, 
    setIsOpen, 
    data,
}: AppDrawerProps<TData>) {
    const isMobile = useIsMobile();

    return (
        <Drawer direction={isMobile ? "bottom" : "right"} open={isOpen} onOpenChange={setIsOpen} autoFocus={isOpen}>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle className="flex items-center justify-between">
                        Editor
                        <DrawerClose asChild>
                            <Button variant="outline" size="default">Close<X/></Button>
                        </DrawerClose>
                    </DrawerTitle>
                </DrawerHeader>
                
                    <div className="flex-1 overflow-y-auto px-2">
                        <Tabs defaultValue="metadata" className="w-full">
                            <div className="w-full sticky top-0 z-10 py-1 bg-background">
                                <TabsList className="w-full">
                                    <TabsTrigger value="metadata">Metadata</TabsTrigger>
                                    <TabsTrigger value="episodes">Episodes</TabsTrigger>
                                    <TabsTrigger value="seasons">Seasons</TabsTrigger>
                                </TabsList>
                            </div>

                            <TabsContent value="metadata" className="space-y-2 px-2">
                                {[...Array(16)].map((_, i) => (
                                    <div key={i} className="flex flex-col gap-2">
                                        <label>Form field input {i}</label>
                                        <Input type="number" key={i} defaultValue={i}/>
                                    </div>
                                ))}
                                <div className="w-full sticky bottom-0 z-10 py-4 bg-background grid grid-cols-2 gap-2">
                                    <Button variant="outline" size="default" className="w-full">Reset</Button>
                                    <Button size="default" className="w-full">Submit</Button>
                                </div>
                            </TabsContent>

                            <TabsContent value="episodes">Episodes.</TabsContent>
                            <TabsContent value="seasons">Seasons.</TabsContent>
                        </Tabs>
                    </div>

                
            </DrawerContent>
        </Drawer>
    );
}
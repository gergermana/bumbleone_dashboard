"use client"

import { z } from "zod/v3";
import { useIsMobile } from "@/hooks/use-mobile";

import { AnimeSchema } from "../validations/schema";
import { GenreSchema } from "@/features/genres/validations/schema";
import { StudioSchema } from "@/features/studios/studio-schema";

import { X } from "lucide-react";

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    // DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button";
import { TabMetadata } from "./editor-tab1";

type AppDrawerProps = {
    isOpen: boolean;
    setIsOpen: (isOpen: React.SetStateAction<boolean>) => void;
    data: z.infer<typeof AnimeSchema> | null;
    genresData?: z.infer<typeof GenreSchema>[];
    studiosData?: z.infer<typeof StudioSchema>[];
}

export function AnimeEditor({ 
    isOpen, 
    setIsOpen, 
    data,
    genresData,
    studiosData,
}: AppDrawerProps) {
    const isMobile = useIsMobile();

    return (
        <Drawer direction={isMobile ? "bottom" : "right"} open={isOpen} onOpenChange={setIsOpen} autoFocus={isOpen} handleOnly={isMobile ? false : true}>
            <DrawerContent className="flex flex-col h-full touch-none" >
                <DrawerHeader>
                    <DrawerTitle className="flex items-center justify-between">
                        Anime Editor
                        <DrawerClose asChild>
                            <Button variant="outline" size="default">Close <X /></Button>
                        </DrawerClose>
                    </DrawerTitle>
                    <DrawerDescription className="flex justify-start items-center">
                        This action cannot be undone.
                    </DrawerDescription>
                </DrawerHeader>

                <Tabs defaultValue="metadata" className="flex flex-col overflow-hidden w-full px-2" data-vaul-no-drag>
                    <TabsList className="w-full">
                        <TabsTrigger value="metadata">Metadata</TabsTrigger>
                        <TabsTrigger value="episodes">Episodes</TabsTrigger>
                        <TabsTrigger value="seasons">Seasons</TabsTrigger>
                    </TabsList>

                    <TabsContent value="metadata" className="flex flex-col flex-1 min-h-0">
                        <TabMetadata 
                            data={data} 
                            genresData={genresData} 
                            studiosData={studiosData}
                        />      
                    </TabsContent>

                    {/* <TabsContent value="episodes" className="space-y-2 pb-2">
                        {[...Array(16)].map((_, i) => (
                            <div key={i} className="flex flex-col gap-2">
                                <label>Episodes {i}</label>
                                <Input type="number" defaultValue={i} />
                            </div>
                        ))}
                    </TabsContent>

                    <TabsContent value="seasons" className="space-y-2">
                        {[...Array(16)].map((_, i) => (
                            <div key={i} className="flex flex-col gap-2">
                                <label>Seasons {i}</label>
                                <Input type="number" defaultValue={i} />
                            </div>
                        ))}
                    </TabsContent> */}
                </Tabs>

                
            </DrawerContent>
        </Drawer>
    );
}
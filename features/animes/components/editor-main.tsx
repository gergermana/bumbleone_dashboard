"use client"

import { z } from "zod/v3";
import { useIsMobile } from "@/hooks/useIsMobile";

import { AnimeSchema } from "../validations/animeSchema";
import { GenreSchema } from "@/features/genres/validations/genreSchema";
import { StudioSchema } from "@/features/studios/validations/studioSchema";

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

                <TabMetadata 
                    data={data} 
                    genresData={genresData} 
                    studiosData={studiosData}
                />    

                {/* <DrawerFooter className="w-full grid grid-cols-2 gap-2 px-0">
                    <Button variant="outline" type="button" className="w-full" onClick={() => form.reset()}>Reset</Button>
                    <Button className="w-full" type="submit">Submit</Button>
                </DrawerFooter> */} 
            </DrawerContent>
        </Drawer>
    );
}
// Hey tomorrow re design and struct the editor with only relative contents. No tabs any more.
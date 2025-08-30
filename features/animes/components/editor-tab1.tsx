"use client";

import { useEffect, useMemo } from "react";

import { useForm } from "react-hook-form";
import { z } from "zod/v3";
import { zodResolver } from "@hookform/resolvers/zod";
import { inputRenderer } from "@/hooks/input-renderer";

import { AnimeSchema } from "../validations/schema";
import { GenreSchema } from "@/features/genres/genres-schema";
import { StudioSchema } from "@/features/studios/studio-schema";
import { animesForm } from "../config/form";

import { 
    Form,
    FormField,
    FormItem,
    FormControl,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { DrawerFooter } from "@/components/ui/drawer";
import { toast } from "sonner";

const defaultAnime: z.infer<typeof AnimeSchema> = {
    id: 0,
    anilistId: undefined,
    franchiseKey: "",
    franchiseOrder: undefined,
    titleEnglish: "",
    slug: "",
    titleJapanese: "",
    titleAlternative: [],
    aired: "",
    premiered: "",
    animeType: "TV",
    animeStatus: "ONGOING",
    coverImg: "",
    bannerImg: "",
    overview: "",
    genres: [],
    studios: [],
    createdAt: "",
    updatedAt: "",
};

interface TabMetadataProps {
    data: z.infer<typeof AnimeSchema> | null;
    genresData?: z.infer<typeof GenreSchema>[];
    studiosData?: z.infer<typeof StudioSchema>[];
}

export function TabMetadata({ data, genresData, studiosData }: TabMetadataProps) {
    const GenreOptions = useMemo(() => genresData?.map((genre: { id: number, name: string }) => ({ id: genre.id, name: genre.name })), [genresData]);
    const StudioOptions = useMemo(() => studiosData?.map((studio: { id: number, name: string }) => ({ id: studio.id, name: studio.name })), [studiosData]);

    const form = useForm<z.input<typeof AnimeSchema>, any, z.output<typeof AnimeSchema>>({
        resolver: zodResolver(AnimeSchema),
        defaultValues: defaultAnime,
    });

    useEffect(() => {
        if (!data) return;
        const defaultGenres = data?.genres?.map((genre: any) => genre.id) ?? [];
        const defaultStudios = data?.studios?.map((studio: any) => studio.id) ?? [];

        form.reset({ 
            ...data,
            genres: defaultGenres,
            studios: defaultStudios,
        })
    }, [data]);

    const onSubmit = (data: z.infer<typeof AnimeSchema>) => {
        console.log(data);
        toast.success('Action completed successfully!', {
            style: {
                '--normal-bg':
                'color-mix(in oklab, light-dark(var(--color-green-600), var(--color-green-400)) 10%, var(--background))',
                '--normal-text': 'light-dark(var(--color-green-600), var(--color-green-400))',
                '--normal-border': 'light-dark(var(--color-green-600), var(--color-green-400))'
            } as React.CSSProperties
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col flex-1 min-h-0">
                <ScrollArea className="flex-1 min-h-0">
                    <div className="space-y-3 px-2">
                        {animesForm.map(input => {
                            return (
                                <FormField
                                    key={input.key}
                                    control={form.control}
                                    name={input.key}
                                    render={({ field }) => {
                                        return (
                                            <FormItem>
                                                <FormLabel>{input.label}</FormLabel>
                                                <FormControl>
                                                    {inputRenderer[input.type](field, input.label)}
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        );
                                    }}
                                />
                            );
                        })}  
                    </div>
                </ScrollArea>
                    
                <DrawerFooter className="w-full grid grid-cols-2 gap-2 px-0">
                    <Button variant="outline" type="button" className="w-full" onClick={() => form.reset()}>Reset</Button>
                    <Button className="w-full" type="submit">Submit</Button>
                </DrawerFooter>
            </form>
        </Form>
    );
}
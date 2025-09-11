"use client";

import { useEffect } from "react";

import { useForm } from "react-hook-form";
import { z } from "zod/v3";
import { zodResolver } from "@hookform/resolvers/zod";
import { inputRenderer } from "@/hooks/inputRenderer";

import { AnimeSchema } from "../validations/animeSchema";
import { GenreSchema } from "@/features/genres/validations/genreSchema";
import { StudioSchema } from "@/features/studios/validations/studioSchema";

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
import useAnimeForm from "../hooks/useAnimeForm";

interface TabMetadataProps {
    data: z.infer<typeof AnimeSchema> | null;
    genresData?: z.infer<typeof GenreSchema>[];
    studiosData?: z.infer<typeof StudioSchema>[];
}

export function TabMetadata({ data, genresData, studiosData }: TabMetadataProps) {
    const formConfig = useAnimeForm();
    const form = useForm<z.input<typeof AnimeSchema>, any, z.output<typeof AnimeSchema>>({
        resolver: zodResolver(AnimeSchema),
        defaultValues: data || {},
    });

    console.log(data);

    useEffect(() => {
        if (!data) return;
        const defaultGenres = data?.genres?.map((genre: any) => genre.id) ?? [];
        const defaultStudios = data?.studios?.map((studio: any) => studio.id) ?? [];

        form.reset({ 
            ...data,
            genres: defaultGenres,
            studios: defaultStudios,
        });

    }, [data, form]);

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
                        {formConfig.map(input => {
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
                                                    {inputRenderer[input.type](field, input.label, input.options)}
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
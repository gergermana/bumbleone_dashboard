"use client";

import { useEffect } from 'react';

import { z, ZodTypeAny } from 'zod/v3';
import { FieldPath, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useIsMobile } from "@/hooks/useIsMobile";
import { inputRenderer } from "@/hooks/inputRenderer";
import { InputType } from "@/types/input-type";

import { SquarePen, X } from "lucide-react";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { 
    Form,
    FormField,
    FormItem,
    FormControl,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "../ui/button";

export default function FormDrawer<TSchema extends ZodTypeAny>({
    isOpen,
    setIsOpen,
    data,
    schema,
    formInputs,
    onSubmit,
}: {
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    data: z.infer<TSchema> | null,
    schema: TSchema,
    formInputs: {
        key: FieldPath<z.infer<TSchema>>,
        label: string,
        type: InputType,
        options?: {
            key: string | number,
            label: string,
        }[],
    }[],
    onSubmit: (data: z.infer<TSchema>) => void,
}) {
    const isMobile = useIsMobile();

    // const form = useForm<z.input<typeof schema>, z.output<typeof schema>>({
    //     resolver: zodResolver(schema),
    //     defaultValues: data ?? {} as z.infer<typeof schema>,
    // });
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: data ?? {} as z.infer<typeof schema>,
    });

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

    return (
        <Drawer 
            direction={isMobile ? "bottom" : "right"} 
            open={isOpen} 
            onOpenChange={setIsOpen} 
            autoFocus={isOpen}
            handleOnly={isMobile ? false : true}
        >
            <DrawerContent>
                <DrawerHeader className="border-b-2">
                    <DrawerTitle className="flex justify-between items-center text-lg">
                        <div className="flex items-center gap-2">
                            <SquarePen/>
                            Edit Anime
                        </div>
                        <DrawerClose asChild>
                            <Button size="icon" variant="ghost" className='rounded-full'>
                                <X className='size-6'/>
                            </Button>
                        </DrawerClose>
                    </DrawerTitle>
                    <DrawerDescription className='sr-only'>Edit Anime Metadata</DrawerDescription>
                </DrawerHeader>
                
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="contents" data-vaul-no-drag>
                        <div className="space-y-3 overflow-y-auto px-4 py-2">
                            {formInputs.map(input => {
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
                        <DrawerFooter className="grid grid-cols-2">
                            <Button variant="outline" type="button" className="w-full" onClick={() => form.reset()}>Reset</Button>
                            <Button className="w-full" type="submit">Submit</Button>
                        </DrawerFooter>
                    </form>
                    
                </Form>
            </DrawerContent>
        </Drawer>
    );
}
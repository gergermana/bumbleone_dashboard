"use client";

import { useIsMobile } from "@/hooks/useIsMobile";
import { useForm, FieldPath } from "react-hook-form";

import { z, ZodTypeAny } from "zod/v3";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputType } from "@/types/input-type";
import { inputRenderer } from "@/hooks/inputRenderer";

import { Plus, X } from "lucide-react";

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

export default function AddDrawer<TSchema extends ZodTypeAny>({
    isOpen,
    setIsOpen,
    schema,
    formInputs,
    onSubmit,
}: {
    isOpen: boolean,
    setIsOpen: () => void,
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
        const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {} as z.infer<typeof schema>,
    });

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
                            <Plus/>
                            Add Anime
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
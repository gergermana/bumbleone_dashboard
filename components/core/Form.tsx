"use client";

import { inputRenderer } from "@/hooks/inputRenderer";
import { InputType } from "@/types/input-type";

import { PlanetWithRing } from "../icons/Logo";

import { 
    Form,
    FormField,
    FormItem,
    FormControl,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { DrawerFooter } from "@/components/ui/drawer";
import { Button } from "../ui/button";
import { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";

export type FormInputsType<TData extends FieldValues> = {
    key: FieldPath<TData>,
    label: string,
    type: InputType,
    options?: {
        key: string | number,
        label: string,
    }[],
}

export default function MyForm<TData extends FieldValues>({
    type = "form",
    form,
    formInputs,
    isPending,
    onSubmit,
}: {
    type?: "form" | "view",
    form: UseFormReturn<TData>,
    formInputs: FormInputsType<TData>[],
    isPending?: boolean,
    onSubmit?: (data: TData) => void,
}) {
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit ?? (() => {}))} className="contents" data-vaul-no-drag>
                <div className="space-y-3 overflow-y-auto px-4 pt-2 pb-4">
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
                {type === "form" && (
                    <DrawerFooter className="grid grid-cols-2 pt-0">
                        <Button variant="outline" type="button" className="w-full" onClick={() => form.reset()}>Reset</Button>
                        <Button className="w-full" type="submit" disabled={isPending}>
                            {isPending && <PlanetWithRing className="animate-spin size-5"/>}
                            Submit
                        </Button>
                    </DrawerFooter>
                )}
            </form>
        </Form>
    );
}
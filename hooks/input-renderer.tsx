"use client";

import { Input } from "@/components/ui/input"
import { NumberInput } from "@/components/number-input";
import { Combobox } from "@/components/app-combobox";
import { ComboboxOptionsType } from "@/components/app-combobox";

interface InputRendererProps {
    context: string;
    field: any;
    type: string;
    options?: ComboboxOptionsType[];
}

export function InputRenderer({ context, field, type, options }: InputRendererProps) {
    switch (type) {
        case "readonly":
            return <Input value={field.value} readOnly/> 
        case "number":
            return (
                <NumberInput 
                    {...field} 
                    min={0} 
                />
            );
        case "combobox":
            return <Combobox context={context} field={field} options={options}/>;
        default:
            return <Input {...field} type="text"/>
    }
}
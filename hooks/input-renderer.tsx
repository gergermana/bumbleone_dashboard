"use client";

import { JSX } from "react";
import { Input } from "@/components/ui/input";
import { NumberInput } from "@/components/inputs/input-number";
import { Combobox } from "@/components/inputs/input-combobox";
import { ComboboxOptionsType } from "@/components/inputs/input-combobox";
import { InputType } from "@/types/input-type";

export const inputRenderer: Record<
    InputType,
    (field: any, label?: string, options?: ComboboxOptionsType[]) => JSX.Element
> = {
    readonly: (field) => <Input value={field.value ?? ""} readOnly className="w-full" />,

    number: (field) => <NumberInput {...field} min={0} />,

    combobox: (field, _label, options) => (
        <Combobox field={field} options={options} />
    ),

    email: (field, label) => (
        <Input {...field} value={field.value ?? ""} type="email" placeholder={label} className="w-full" />
    ),

    password: (field, label) => (
        <Input {...field} value={field.value ?? ""} type="password" placeholder={label} className="w-full" />
    ),

    text: (field, label) => (
        <Input {...field} value={field.value ?? ""} placeholder={label} className="w-full" />
    ),
};
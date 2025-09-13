"use client";

import { JSX } from "react";

import { InputType } from "@/types/input-type";

import { Combobox, NumberInput, Select } from "@/components/core";
import { Input } from "@/components/ui/input";

export const inputRenderer: Record<
    InputType,
    (field: any, label?: string, options?: any) => JSX.Element
> = {
    readonly: (field) => <Input value={field.value ?? ""} readOnly className="w-full" />,

    number: (field) => <NumberInput {...field} min={0} />,

    combobox: (field, label, options) => (
        <Combobox label={label} value={field.value ?? ""} onChange={field.onChange} options={options} />
    ),

    email: (field, label) => (
        <Input {...field} value={field.value ?? ""} type="email" placeholder={label} className="w-full" />
    ),

    password: (field, label) => (
        <Input {...field} value={field.value ?? ""} type="password" placeholder={label} className="w-full" />
    ),

    text: (field, label) => (
        <Input value={field.value ?? ""} placeholder={label} onChange={field.onChange} className="w-full" />
    ),

    select: (field, _, options) => (
        <Select value={field.value ?? ""} onChange={field.onChange} options={options} size="default" className="w-full"/>
    )
};
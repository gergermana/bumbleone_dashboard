"use client"

import { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"

export type ComboboxOptionsType = {
    id: number;
    name: string;
}

export default function MyCombobox({ 
    label, 
    value, 
    options, 
    onChange,
    ...props
}: {
    label?: string,
    value: number[],
    options: {
        key: number,
        label: string,
    }[],
    onChange: (value: number[]) => void,
}) {
    const [open, setOpen] = useState<boolean>(false);

    const onSelectChange = (selectedLabel: string) => {
        const selectedOption = options?.find(f => f.label === selectedLabel);
        if (!selectedOption) return;

        const id = selectedOption.key;
        const updated = value.includes(id)
            ? value.filter((f: number) => f !== id)
            : [...value, id];
            
        onChange(updated);
    }

    return (
        <>
            <Button
                variant="outline"
                type="button"
                role="combobox"
                aria-expanded={open}
                className="justify-between h-9"
                onClick={() => setOpen(!open)}
                {...props}
            >
                <span className="max-w-[90%] overflow-hidden text-ellipsis break-words whitespace-normal text-start">
                    {value.length > 0
                        ? options
                            ?.filter((f) => value.includes(f.key))
                            .map((f) => f.label)
                            .join(", ")
                        : `Select ${label}...`}
                </span>
                <ChevronsUpDown className="opacity-50" />
            </Button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <OptionsList defaultOptions={value} options={options} onSelectChange={onSelectChange}/>
            </CommandDialog>
        </>
    );
}

function OptionsList({ 
    defaultOptions, 
    options, 
    onSelectChange 
}: {
    defaultOptions: number[],
    options: {
        key: number,
        label: string,
    }[],
    onSelectChange: (selectedValue: string) => void;
}) {
    return (
        <Command className="h-full bg-transparent" autoFocus={false}>
            <CommandInput placeholder="Search framework..." autoFocus={false}/>
            <CommandList className="h-full">
                <CommandEmpty>No framework found.</CommandEmpty>
                <CommandGroup>
                    {options?.map((option) => (
                        <CommandItem
                            key={option.key}
                            value={option.label}
                            onSelect={onSelectChange}
                        >
                            {option.label}
                            <Check
                                className={cn(
                                    "ml-auto",
                                    defaultOptions.includes(option.key) ? "opacity-100" : "opacity-0"
                                )}
                            />
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </Command>
    );
}
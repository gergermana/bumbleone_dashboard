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
    defaultOptions, 
    options, 
    onChange,
    ...props
}: {
    label?: string,
    defaultOptions: any,
    options: {
        id: number,
        name: string,
    }[],
    onChange: any,
}) {
    const [open, setOpen] = useState<boolean>(false);

    const onSelectChange = (selectedLabel: string) => {
        const selectedOption = options?.find(f => f.name === selectedLabel);
        if (!selectedOption) return;

        const id = selectedOption.id;
        const updated = defaultOptions.includes(id)
            ? defaultOptions.filter((f: number) => f !== id)
            : [...defaultOptions, id];
            
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
                    {defaultOptions.length > 0
                        ? options
                            ?.filter((f) => defaultOptions.includes(f.id))
                            .map((f) => f.name)
                            .join(", ")
                        : `Select ${label}...`}
                </span>
                <ChevronsUpDown className="opacity-50" />
            </Button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <OptionsList defaultOptions={defaultOptions} options={options} onSelectChange={onSelectChange}/>
            </CommandDialog>
        </>
    );
}

function OptionsList({ 
    defaultOptions, 
    options, 
    onSelectChange 
}: {
    defaultOptions: any,
    options: {
        id: number,
        name: string,
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
                            key={option.id}
                            value={option.name}
                            onSelect={onSelectChange}
                        >
                            {option.name}
                            <Check
                                className={cn(
                                    "ml-auto",
                                    defaultOptions.includes(option.id) ? "opacity-100" : "opacity-0"
                                )}
                            />
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </Command>
    );
}
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
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useIsMobile } from "@/hooks/use-mobile"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "../ui/drawer"

export type ComboboxOptionsType = {
    id: number;
    name: string;
}

interface ComboboxProps {
    context?: string;
    field: any;
    options?: ComboboxOptionsType[];
}

export function Combobox({ context, field, options }: ComboboxProps) {
    const [open, setOpen] = useState<boolean>(false);
    const isMobile = useIsMobile();

    const onSelectChange = (selectedLabel: string) => {
        const selectedOption = options?.find(f => f.name === selectedLabel);
        if (!selectedOption) return;

        const id = selectedOption.id;
        const updated = field.value.includes(id)
            ? field.value.filter((f: number) => f !== id)
            : [...field.value, id];
            
        field.onChange(updated);
    }

    // if (isMobile) {
        return (
            <>
                <Button
                    variant="outline"
                    type="button"
                    role="combobox"
                    aria-expanded={open}
                    className="justify-between h-auto"
                    onClick={() => setOpen(!open)}
                >
                    <span className="max-w-[90%] overflow-hidden text-ellipsis break-words whitespace-normal text-start">
                        {field.value.length > 0
                            ? options
                                ?.filter((f) => field.value.includes(f.id))
                                .map((f) => f.name)
                                .join(", ")
                            : `Select ${context}...`}
                    </span>
                    <ChevronsUpDown className="opacity-50" />
                </Button>
                <CommandDialog open={open} onOpenChange={setOpen}>
                    <OptionsList open={open} field={field} options={options} onSelectChange={onSelectChange}/>
                </CommandDialog>
            </>
        );
    // }

    // if (isMobile) {
    //     return (
    //         <Drawer open={open} onOpenChange={setOpen}>
    //             <DrawerTrigger asChild>
    //                 <Button
    //                     variant="outline"
    //                     role="combobox"
    //                     aria-expanded={open}
    //                     className="justify-between h-auto"
    //                 >
    //                     <span className="max-w-[90%] overflow-hidden text-ellipsis break-words whitespace-normal text-start">
    //                         {field.value.length > 0
    //                             ? options
    //                                 ?.filter((f) => field.value.includes(f.id))
    //                                 .map((f) => f.name)
    //                                 .join(", ")
    //                             : `Select ${context}...`}
    //                     </span>
    //                     <ChevronsUpDown className="opacity-50" />
    //                 </Button>
    //             </DrawerTrigger>
    //             <DrawerContent className="flex flex-col">
    //                 <DrawerHeader className="sr-only">
    //                     <DrawerTitle>Select Combobox</DrawerTitle>
    //                 </DrawerHeader>
    //                 <div className="mt-1 pb-4 rounded-xl flex flex-col min-h-0 max-h-[40vh]" data-vaul-no-drag>
    //                     <OptionsList field={field} options={options} onSelectChange={onSelectChange}/>
    //                 </div>
    //             </DrawerContent>
    //         </Drawer>
    //     );
    // }

    // return (
    //     <Popover open={open} onOpenChange={setOpen}>
    //         <PopoverTrigger asChild>
    //             <Button
    //                 variant="outline"
    //                 role="combobox"
    //                 aria-expanded={open}
    //                 className="justify-between h-auto"
    //             >
    //                 <span className="max-w-[90%] overflow-hidden text-ellipsis break-words whitespace-normal text-start">
    //                     {field.value.length > 0
    //                         ? options
    //                             ?.filter((f) => field.value.includes(f.id))
    //                             .map((f) => f.name)
    //                             .join(", ")
    //                         : `Select ${context}...`}
    //                 </span>
    //                 <ChevronsUpDown className="opacity-50" />
    //             </Button>
    //         </PopoverTrigger>
    //         <PopoverContent className="w-[200px] p-0" align="end" onOpenAutoFocus={(e) => e.preventDefault()}>
    //             <OptionsList open={open} field={field} options={options} onSelectChange={onSelectChange}/>
    //         </PopoverContent>
    //     </Popover>
    // )
}

interface OptionsListProps extends ComboboxProps {
    open: boolean;
    onSelectChange: (selectedValue: string) => void;
}

function OptionsList({ open, field, options, onSelectChange }: OptionsListProps) {
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
                                    field.value.includes(option.id) ? "opacity-100" : "opacity-0"
                                )}
                            />
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </Command>
    );
}

"use client";

import { cn } from "@/lib/utils";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "../ui/select";

export default function MySelect({ 
    label, 
    value, 
    onChange, 
    options, 
    className,
    ...props 
}: { 
    label?: string, 
    value: string, 
    onChange: any,
    options: any, 
    className?: string,
}) {
    return (
        <Select 
            value={value}
            defaultValue={value}
            onValueChange={onChange}
        >
            <SelectTrigger
                size="sm"
                id="view-selector"
                className={cn("", className)}
                {...props}
            >
                {label && <span className="font-medium">{label}: </span>}
                <SelectValue/>
            </SelectTrigger>
            
            <SelectContent align="end">
                {/* <SelectGroup> */}
                    {options.map((option: any) => 
                        <SelectItem 
                            key={option.key} 
                            value={option.key}
                        >
                            {option.label}
                        </SelectItem>
                    )}
                {/* </SelectGroup> */}
            </SelectContent>
        </Select>
    );
}

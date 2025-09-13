"use client";

import { cn } from "@/lib/utils";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../ui/select";

export default function MySelect({ 
    label, 
    value, 
    onChange, 
    options, 
    size = "default",
    className,
    ...props 
}: { 
    label?: string, 
    value: string, 
    onChange: (value: string) => void,
    options: {
        key: string,
        label: string,
    }[], 
    size?: "sm" | "default";
    className?: string,
}) {
    return (
        <Select 
            value={value}
            defaultValue={value}
            onValueChange={onChange}
        >
            <SelectTrigger
                size={size}
                id="view-selector"
                className={cn("", className)}
                {...props}
            >
                {label && <span className="font-medium">{label}: </span>}
                <SelectValue/>
            </SelectTrigger>
            
            <SelectContent align="end">
                {/* <SelectGroup> */}
                    {options.map((option) => 
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

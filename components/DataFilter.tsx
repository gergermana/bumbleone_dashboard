"use client";

import { useIsMobile } from "@/hooks/useIsMobile";

import { ChevronDown, type LucideIcon } from "lucide-react";

import { Select } from "./core";

import { 
    DropdownMenu, 
    DropdownMenuTrigger, 
    DropdownMenuContent, 
    DropdownMenuGroup, 
    DropdownMenuLabel, 
    DropdownMenuSeparator, 
    DropdownMenuRadioGroup, 
    DropdownMenuRadioItem 
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";

export type DataFilterItemsType = {
    label: string;
    type: string;
    defaultValue: string;
    icon?: LucideIcon;
    options: { key: string, label: string }[];
};

export default function DataFilter({ 
    items,
    currentFilters,
    onFilterChange,
}: {
    items: DataFilterItemsType[],
    currentFilters: Record<string, string>,
    onFilterChange: (newFilter: string, type: string) => void;
}) {
    const isMobile = useIsMobile();

    if (isMobile) {
        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="ml-auto">
                        <span>Filters</span>
                        <ChevronDown />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    {items?.map((item, index) => (
                        <DropdownMenuGroup key={index}>
                            <DropdownMenuLabel>
                                {item.label}
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuRadioGroup 
                                value={currentFilters?.[item.type]} 
                                onValueChange={(selectedValue: string) => onFilterChange?.(selectedValue, item.type)} 
                            >
                                {item.options.map(option => (
                                    <DropdownMenuRadioItem 
                                        key={option.key} 
                                        value={option.key} 
                                        className="capitalize"
                                        onSelect={(e) => e.preventDefault()}
                                    >
                                        {option.label}
                                    </DropdownMenuRadioItem>
                                ))}
                            </DropdownMenuRadioGroup>
                        </DropdownMenuGroup>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        );
    }

    return (
        <div className="flex items-center gap-2">
            {/* {items?.map((filter, index) => (
                <Select 
                    label={filter.label}
                    key={index} 
                    value={currentFilters?.[filter.type]} 
                    options={filter.options} 
                    onChange={(selectedValue: string) => onFilterChange?.(selectedValue, filter.type)}
                />
            ))} */}
        </div>
    );
}
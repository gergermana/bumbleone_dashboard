"use client"

import { Table } from "@tanstack/react-table";

import { ChevronDown, Columns2, Plus, Trash } from "lucide-react";

import { 
    DropdownMenu, 
    DropdownMenuCheckboxItem, 
    DropdownMenuContent, 
    DropdownMenuTrigger, 
    DropdownMenuLabel,
    DropdownMenuGroup,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator
} from "../ui/dropdown-menu";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "../ui/button";

import { useIsMobile } from "@/hooks/use-mobile";

import { FilterItemsConfig } from "./data-table";
import { AppSearch } from "@/components/app-search";

const sortOptions = [
    { key: "LATEST", label: "Latest" },
    { key: "OLDEST", label: "Oldest" },
    { key: "A_TO_Z", label: "A to Z" },
    { key: "Z_TO_A", label: "Z to A" },
]

interface DataTableHeaderProps<TData> {
    table: Table<TData>;
    filterItems?: FilterItemsConfig[];
    search: string;
    sorting: string;
    currentFilters?: Record<string, string>;
    onSearchChange: (newSearch: string) => void;
    onSortingChange: (newSorting: string) => void;
    onFilterChange?: (newFilter: string, type: string) => void;
}

export function DataTableHeader<TData>({ 
    table, 
    filterItems, 
    search, 
    sorting, 
    currentFilters, 
    onSearchChange, 
    onSortingChange, 
    onFilterChange 
}: DataTableHeaderProps<TData>) {
    const isMobile = useIsMobile();
    
    return (
        <>
            <div className="flex items-center gap-2">
                <AppSearch search={search} onSearchChange={onSearchChange}/>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="ml-auto">
                            <Columns2/>
                            <span className="hidden xl:inline">Customize Columns</span>
                            <span className="hidden sm:inline xl:hidden">Columns</span>
                            <ChevronDown />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                        onSelect={(e) => e.preventDefault()}
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })
                        }
                    </DropdownMenuContent>
                </DropdownMenu>
                
                <Button 
                    variant="outline" 
                    size="sm" 
                    disabled={table.getFilteredSelectedRowModel().rows.length > 0 ? false : true}
                    onClick={() => table.getFilteredSelectedRowModel().rows.map(row => {
                        console.log(row.original);
                    })}
                >
                    <Trash/>
                    <span className="hidden lg:inline">Delete</span>
                </Button>

                <Button variant="outline" size="sm">
                    <Plus/>
                    <span className="hidden lg:inline">Add Anime</span>
                </Button>
            </div>
            <div className="flex items-center justify-between gap-2">
                <div className="text-muted-foreground font-medium text-sm">
                    {table.getFilteredSelectedRowModel().rows.length} row(s) selected.
                </div>
                <div className="flex items-center gap-2">
                    <Select 
                        value={sorting}
                        onValueChange={(selectedValue: string) => onSortingChange(selectedValue)}
                    >
                        <SelectTrigger
                            size="sm"
                            id="view-selector"
                        >
                            <SelectValue/>
                        </SelectTrigger>
                        <SelectContent align="end">
                            <SelectGroup>
                                {sortOptions.map(sort => 
                                    <SelectItem key={sort.key} value={sort.key}>{sort.label}</SelectItem>
                                )}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    {!isMobile && filterItems?.map((filter, index) => (
                        <Select 
                            key={index} 
                            defaultValue={filter.defaultValue} 
                            value={currentFilters?.[filter.type]}
                            onValueChange={(selectedValue: string) => onFilterChange?.(selectedValue, filter.type)}
                        >
                            <SelectTrigger
                                size="sm"
                                id="view-selector"
                            >
                                <span className="font-medium">{filter.label}: </span>
                                <SelectValue/>
                            </SelectTrigger>
                            <SelectContent align="end">
                                <SelectGroup >
                                    {filter.options.map(option => (
                                        <SelectItem key={option.key} value={option.key}>{option.label}</SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    ))}
                    {isMobile && (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="ml-auto">
                                    <span>Filters</span>
                                    <ChevronDown />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {filterItems?.map((filter, index) => (
                                    <DropdownMenuGroup key={index}>
                                        <DropdownMenuLabel>
                                            {filter.label}
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuRadioGroup 
                                            value={currentFilters?.[filter.type]} 
                                            onValueChange={(selectedValue: string) => onFilterChange?.(selectedValue, filter.type)} 
                                        >
                                            {filter.options.map(option => (
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
                    )}
                </div>
            </div>
        </>
    );
}
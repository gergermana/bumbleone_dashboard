"use client";

import { Table } from "@tanstack/react-table";

import { Columns2, ChevronDown } from "lucide-react";

import { 
    DropdownMenu, 
    DropdownMenuTrigger, 
    DropdownMenuContent, 
    DropdownMenuCheckboxItem
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";

export default function TableColumnsFilter<TData>({
    table,
}: {
    table: Table<TData>,
}) {
    return (
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
    );
} 
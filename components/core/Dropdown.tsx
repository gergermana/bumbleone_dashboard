"use client";

import { ChevronDown } from "lucide-react";

import { 
    DropdownMenu, 
    DropdownMenuTrigger, 
    DropdownMenuContent, 
    // DropdownMenuGroup, 
    // DropdownMenuLabel, 
    // DropdownMenuSeparator, 
    // DropdownMenuRadioGroup, 
    // DropdownMenuRadioItem 
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";

export default function MyDropdown({
    
}) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="ml-auto">
                    <span>Filters</span>
                    <ChevronDown />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
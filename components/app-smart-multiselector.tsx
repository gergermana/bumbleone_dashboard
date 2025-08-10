"use client";

import { cn } from "@/lib/utils";

import { ChevronDown } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";

export function AppProMultiSelector() {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center">
                    Customize Columns
                    <ChevronDown/>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-40 flex flex-col py-2 bg-red-400" align="end">
                <label className="flex items-center gap-2 text-sm">
                    <Checkbox
                        // checked={selected.includes(option)}
                        // onCheckedChange={() => toggleOption(option)}
                        className={cn(
                            "border border-muted bg-muted data-[state=checked]:bg-primary text-primary-foreground p-0",
                            "flex items-center justify-center"
                        )}
                    />
                    select
                </label>
            </PopoverContent>
        </Popover>
    );
}
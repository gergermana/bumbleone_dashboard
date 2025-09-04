"use client"

import { useEffect, useState } from "react";

import { Separator } from "@/components/ui/separator";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { AppPagination } from "@/components/app-pagination";

interface DataTableFooterProps{
    total: number;
    page: string;
    limit: string;
    onPageChange: (newPage: number) => void;
    onLimitChange: (newLimit: number) => void;
}

export function DataTableFooter({ total, page, limit, onLimitChange, onPageChange }: DataTableFooterProps) {
    const totalPages = Math.ceil(total / parseInt(limit));

    const [pageInput, setPageInput] = useState(page);

    useEffect(() => {
        setPageInput(page);
    }, [page])

    const handlePageJump = () => {
        const parsed = parseInt(pageInput);
        if (!isNaN(parsed) && parsed >= 1 && totalPages >= parsed) {
            onPageChange(parsed);
        } else {
            setPageInput(page);
        }
    }
    
    return (
        <>
            <div className="flex items-center text-sm font-medium text-muted-foreground gap-4">
                <div className="items-center gap-2 hidden lg:flex">
                    Page {page} of {totalPages}
                </div>
                <Separator orientation="vertical" className="hidden lg:inline"/>
                <div className="flex items-center gap-2">
                    Go to page:  
                    <Input 
                        className="w-14 h-8 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none" 
                        type="number"
                        value={pageInput}
                        onChange={(e) => setPageInput(e.target.value)}
                    />
                    <Button size="sm" variant="outline" onClick={handlePageJump} disabled={page === pageInput}>Go</Button>
                </div>
                <div className="flex items-center gap-2 ml-auto">
                    <span>Rows</span>
                    <span className="hidden md:inline">Per Page</span>
                    <Select onValueChange={(selectedValue: string) => onLimitChange(parseInt(selectedValue))} defaultValue={limit.toString()}>
                        <SelectTrigger
                            size="sm"
                            id="view-selector"
                        >
                            <SelectValue/>
                        </SelectTrigger>
                        <SelectContent align="end">
                            <SelectGroup>
                                <SelectItem value="10">10</SelectItem>
                                <SelectItem value="20">20</SelectItem>
                                <SelectItem value="30">30</SelectItem>
                                <SelectItem value="40">40</SelectItem>
                                <SelectItem value="50">50</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <AppPagination totalPages={totalPages} page={page} onPageChange={onPageChange}/>
        </>
    );
}
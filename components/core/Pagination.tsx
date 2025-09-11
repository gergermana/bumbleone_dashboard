"use client"

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

import { useMemo } from "react";
import React from "react";

interface AppPaginationProps{
    totalPages: number;
    page: string;
    onPageChange: (newPage: number) => void;
}

export default function MyPagination({ totalPages, page, onPageChange }: AppPaginationProps) {
    const currentPage = parseInt(page);
    const boundaries = 1;
    const siblings = 1;

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            onPageChange(newPage);
        }
    };

    const pageNumbers = useMemo(() => {
        const range = (start: number, end: number) => {
            const length = end - start + 1;
            return Array.from({ length }, (_, i) => start + i);
        };

        if (totalPages <= boundaries * 2 + siblings * 2 + 3) {
            return range(1, totalPages);
        }

        const leftSiblingIndex = Math.max(currentPage - siblings, 1);
        const rightSiblingIndex = Math.min(currentPage + siblings, totalPages);

        const shouldShowLeftDots = leftSiblingIndex > boundaries + 2;
        const shouldShowRightDots = rightSiblingIndex < totalPages - boundaries - 1;

        if (!shouldShowLeftDots && shouldShowRightDots) {
            const leftItemCount = siblings * 2 + boundaries + 2;
            return [
                ...range(1, leftItemCount),
                '...',
                ...range(totalPages - boundaries + 1, totalPages)
            ];
        }

        if (shouldShowLeftDots && !shouldShowRightDots) {
            const rightItemCount = boundaries + 1 + 2 * siblings;
            return [
                ...range(1, boundaries),
                '...',
                ...range(totalPages - rightItemCount + 1, totalPages)
            ];
        }

        return [
            ...range(1, boundaries),
            '...',
            ...range(leftSiblingIndex, rightSiblingIndex),
            '...',
            ...range(totalPages - boundaries + 1, totalPages)
            ];
    }, [currentPage, totalPages, siblings, boundaries]);

    return (
        <Pagination>
            <PaginationContent className="select-none">
                <PaginationItem>
                    <PaginationPrevious 
                        disabled={currentPage <= 1} 
                        onClick={() => handlePageChange(currentPage - 1)}
                        className="w-[30px] sm:w-fit"
                    />
                </PaginationItem>
                {pageNumbers.map((pageNumber, index) => (
                    <React.Fragment key={index}>
                        {pageNumber === '...' ? (
                            <PaginationItem>
                                <PaginationEllipsis className="w-[30px]"/>
                            </PaginationItem>
                        ) : (
                            <PaginationItem className="cursor-default">
                                <PaginationLink
                                    isActive={pageNumber === currentPage}
                                    onClick={() => handlePageChange(Number(pageNumber))}
                                >
                                    {pageNumber}
                                </PaginationLink>
                            </PaginationItem>
                        )}
                    </React.Fragment>
                ))}
                <PaginationItem>
                    <PaginationNext 
                        disabled={currentPage >= totalPages} 
                        onClick={() => handlePageChange(currentPage + 1)}
                        className="w-[30px] sm:w-fit"    
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>   
    );
}
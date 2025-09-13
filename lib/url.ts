"use client"

import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { useMemo } from "react";

type ObjectType = Record<string, string>;

function getParams(
    searchParams: URLSearchParams, 
    defaults: ObjectType,
): ObjectType{
    const result: ObjectType = {};

    Object.entries(defaults).forEach(([key, val]) => {
        const value = searchParams.get(key) ?? val.toString();
        result[key] = value
    });

    return result;
}

export function useUpdateParams(defaults: ObjectType) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathName = usePathname();

    const currentParams = useMemo(() => getParams(searchParams, defaults), [searchParams, defaults]);

    const updateParams = (updates: Record<string, string>) => {
        const params = new URLSearchParams();

        const allParams = { ...currentParams, ...updates };
        const orderedKeys = Object.keys(defaults);

        orderedKeys.forEach((key) => {
            const value = allParams[key];
            if (value !== undefined && value !== "" && value.toString() !== defaults[key]) {
                params.set(key, value.toString());
            }
        });

        router.replace(`${pathName}?${params.toString()}`);
    }

    const handlePageChange = (newPage: number) => { 
        updateParams({
            page: newPage.toString(),
        });
    }

    const handleLimitChange = (newLimit: number) => {
        updateParams({ 
            page: "1", 
            limit: newLimit.toString() 
        });
    };

    const handleSortingChange = (newSorting: string) => {
        updateParams({ 
            page: "1", 
            sorting: newSorting 
        });
    };

    const handleFilterChange = (newFilter: string, type: string) => {
        updateParams({ 
            page: "1", 
            [type]: newFilter 
        });
    };

    const handleSearchChange = (searchQuery: string) => {
        if (searchQuery.trim() !== ""){
            updateParams({
                page: "1",
                search: searchQuery,
            });
        }
    }

    return {
        currentParams,
        updateParams,
        handlePageChange,
        handleLimitChange,
        handleSortingChange,
        handleFilterChange,
        handleSearchChange,
    }
}




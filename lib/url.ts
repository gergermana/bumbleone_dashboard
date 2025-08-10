"use client"

import { useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { useMemo } from "react";

function getParams<T extends Record<string, string>>(
    searchParams: URLSearchParams, 
    defaults: T,
): T{
    const result = {} as T;

    Object.entries(defaults).forEach(([key, defaultValue]) => {
        const value = searchParams.get(key) ?? defaultValue.toString();
        
        if (key === "page" || key === "limit") {
            (result as any)[key] = parseInt(value);
        } else {
            (result as any)[key] = value;
        }
    });

    return result;
}

export function useUpdateParams<T extends Record<string, string>>(
    defaults: T,
    parameterOrder?: string[],
) {
    const searchParams = useSearchParams();
    const router = useRouter();

    const currentParams = useMemo(() => getParams(searchParams, defaults), [searchParams]);

    const updateParams = (updates: Record<string, string>) => {
        const params = new URLSearchParams();

        const allParams = { ...currentParams, ...updates };

        const orderedKeys = parameterOrder || Object.keys(defaults);

        orderedKeys.forEach((key) => {
            const value = allParams[key as keyof T];
            if (value !== undefined && value !== "" && value.toString() !== defaults[key]) {
                params.set(key, value.toString());
            }
        });

        router.push(`?${params.toString()}`);
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




"use client"

import { useState } from "react";

import { useUpdateParams } from "@/lib/url";

import { useFranchiseDetail, useFranchiseEntries } from "../hooks/useFranchiseQueries";
import { useFranchiseForm } from "../hooks/getFranchiseForm";
import { useFranchiseColumns } from "../hooks/getFranchiseColumns";

import { DEFAULT_FRANCHISE_PARAMS } from "../config/franchiseConstants";
import { FranchiseType } from "../validations/franchiseSchema";

import { DataTable, AddDrawer } from "@/components/core";
import { toast } from "sonner";
import { useEntryColumns } from "@/features/entries/hooks/useEntryColumns";
import { EntryType } from "@/features/entries/validations/entrySchema";

export default function FranchiseDetailWrapper({ slug }: { slug: string }) {
    const [drawerState, setDrawerState] = useState<"closed" | "edit" | "add">("closed");
    const [drawerData, setDrawerData] = useState<EntryType | null>(null);

    // const formInputs = useFranchiseForm();
    const columns = useEntryColumns({ setDrawerState, setDrawerData });

    const { currentParams, handlePageChange, handleLimitChange, handleSortingChange, handleFilterChange, handleSearchChange } = 
        useUpdateParams(DEFAULT_FRANCHISE_PARAMS);

    const filters = {
        page: currentParams.page, 
        limit: currentParams.limit, 
        search: currentParams.search,
        sorting: currentParams.sorting, 
    }

    const { data: detailData, isLoading: detailIsLoading } = useFranchiseDetail(slug);
    const { data: entriesData, isLoading: entriesIsLoading } = useFranchiseEntries(slug, filters);
    
    return (
        <div>
            <DataTable
                data={entriesData?.datalist}
                total={entriesData?.total}
                getColumns={columns}
                isLoading={entriesIsLoading} 
                currentParams={{
                    page: currentParams.page,
                    limit: currentParams.limit,
                    search: currentParams.search,
                    sorting: currentParams.sorting,
                }}
                onChangeFns={{
                    onPageChange: handlePageChange,
                    onLimitChange: handleLimitChange,
                    onSearchChange: handleSearchChange,
                    onSortingChange: handleSortingChange,
                }}
                stateProps={{
                    setState: setDrawerState,
                }}
            />
        </div>
    );
}
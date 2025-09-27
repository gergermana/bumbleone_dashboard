"use client"

import { useState } from "react";
import { z } from "zod";

import { useUpdateParams } from "@/lib/url";

import { useEntry } from "../hooks/useEntryQueries";
import { useUpdateEntryMutation } from "../hooks/useEntryMutation";
import { useAnimeForm } from "../hooks/useEntryForm";
import { useEntryColumns } from "../hooks/useEntryColumns";

import { filterItems } from "../config/entryFilters";
import { DEFAULT_ENTRY_PARAMS } from "../config/entryConstants";
import { EntrySchema } from "../validations/entrySchema";

import { DataTable, AddDrawer, EditDrawer } from "@/components/core";
import { toast } from "sonner";

export default function EntryWrapper() {
    const [drawerState, setDrawerState] = useState<"closed" | "edit" | "add">("closed");
    const [drawerData, setDrawerData] = useState<z.infer<typeof EntrySchema> | null>(null);

    // const formInputs = useAnimeForm();
    const columns = useEntryColumns({ setDrawerState, setDrawerData });

    const { currentParams, handlePageChange, handleLimitChange, handleSortingChange, handleFilterChange, handleSearchChange } = 
        useUpdateParams(DEFAULT_ENTRY_PARAMS);

    const filters = {
        page: currentParams.page, 
        limit: currentParams.limit, 
        search: currentParams.search,
        sorting: currentParams.sorting, 
        animeType: currentParams.animeType, 
        animeStatus: currentParams.animeStatus
    }

    const { data, isLoading } = useEntry(filters);
    const { mutate: updateEntryMutate, isPending: updateEntryPending } = useUpdateEntryMutation();

    // const handleAddSubmit = () => {
    //     console.log("I'm add");
    // }

    // const handleEditSubmit = (data: z.infer<typeof EntrySchema>) => {
    //     console.log(data);
    //     updateAnimeMutate({ id: data.id.toString(), data });
    //     toast.success('Action completed successfully!', {
    //         style: {
    //             '--normal-bg':
    //             'color-mix(in oklab, light-dark(var(--color-green-600), var(--color-green-400)) 10%, var(--background))',
    //             '--normal-text': 'light-dark(var(--color-green-600), var(--color-green-400))',
    //             '--normal-border': 'light-dark(var(--color-green-600), var(--color-green-400))'
    //         } as React.CSSProperties
    //     })
    // }
    
    return (
        <div>
            <DataTable
                data={data?.datalist}
                total={data?.total}
                getColumns={columns}
                filterItems={filterItems} // Optional
                isLoading={isLoading} 
                currentParams={{
                    page: currentParams.page,
                    limit: currentParams.limit,
                    search: currentParams.search,
                    sorting: currentParams.sorting,
                    filters: {
                        animeType: currentParams.animeType,
                        animeStatus: currentParams.animeStatus,
                    }
                }}
                onChangeFns={{
                    onPageChange: handlePageChange,
                    onLimitChange: handleLimitChange,
                    onSearchChange: handleSearchChange,
                    onSortingChange: handleSortingChange,
                    onFilterChange: handleFilterChange,  //Optional
                }}
                stateProps={{
                    setState: setDrawerState,
                }}
            />
            {/* <AddDrawer
                isOpen={drawerState === 'add'}
                setIsOpen={() => setDrawerState('closed')}
                schema={AnimeSchema}
                formInputs={formInputs}
                onSubmit={handleAddSubmit}
            />
            <EditDrawer
                isOpen={drawerState === 'edit'}
                setIsOpen={() => setDrawerState('closed')}
                data={drawerData ?? null}
                schema={AnimeSchema}
                formInputs={formInputs}
                isPending={updateAnimePending}
                onSubmit={handleEditSubmit}
            /> */}
        </div>
    );
}
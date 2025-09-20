"use client"

import { useState } from "react";
import { z } from "zod/v3";

import { useAnime } from "../hooks/useAnimeQueries";

import { useUpdateParams } from "@/lib/url";
import { filterItems } from "@/features/animes/config/animeFilters";
import { DEFAULT_ANIME_PARAMS } from "../config/animeConstants";
import { AnimeSchema } from "../validations/animeSchema";
import useAnimeForm from "../hooks/useAnimeForm";

import useAnimeColumns from "../hooks/useAnimeColumns";
import { DataTable, AddDrawer, EditDrawer } from "@/components/core";
import { toast } from "sonner";
import { useUpdateAnimeMutation } from "../api/animeMutations";

export default function AnimeWrapper() {
    const [drawerState, setDrawerState] = useState<"closed" | "edit" | "add">("closed");
    const [drawerData, setDrawerData] = useState<z.infer<typeof AnimeSchema> | null>(null);

    const { currentParams, handlePageChange, handleLimitChange, handleSortingChange, handleFilterChange, handleSearchChange } = 
        useUpdateParams(DEFAULT_ANIME_PARAMS);

    const filters = {
        page: currentParams.page, 
        limit: currentParams.limit, 
        search: currentParams.search,
        sorting: currentParams.sorting, 
        animeType: currentParams.animeType, 
        animeStatus: currentParams.animeStatus
    }

    const { data, isLoading } = useAnime(filters);

    const { mutate: updateAnimeMutate, isPending: updateAnimePending } = useUpdateAnimeMutation();
    const formInputs = useAnimeForm();
    const columns = useAnimeColumns({
        setDrawerState,
        setDrawerData,
    });

    const handleAddSubmit = () => {
        console.log("I'm add");
    }

    const handleEditSubmit = (data: z.infer<typeof AnimeSchema>) => {
        console.log(data);
        updateAnimeMutate({ id: data.id.toString(), data });
        toast.success('Action completed successfully!', {
            style: {
                '--normal-bg':
                'color-mix(in oklab, light-dark(var(--color-green-600), var(--color-green-400)) 10%, var(--background))',
                '--normal-text': 'light-dark(var(--color-green-600), var(--color-green-400))',
                '--normal-border': 'light-dark(var(--color-green-600), var(--color-green-400))'
            } as React.CSSProperties
        })
    }
    
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
            <AddDrawer
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
            />
        </div>
    );
}
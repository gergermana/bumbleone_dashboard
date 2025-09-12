"use client"

import { useState } from "react";
import { z } from "zod/v3";

import { useAnime } from "../hooks/useAnimeQueries";

import { useUpdateParams } from "@/lib/url";
import { filterItems } from "@/features/animes/config/animeFilters";
import { DEFAULT_ANIME_PARAMS } from "../config/animeConstants";
import { AnimeSchema } from "../validations/animeSchema";
import useAnimeForm from "../hooks/useAnimeForm";

import { DataTable, FormDrawer } from "@/components/core";
import useAnimeColumns from "../hooks/useAnimeColumns";
import { toast } from "sonner";

export default function AnimeWrapper() {
    const [openEditor, setOpenEditor] = useState(false);
    const [editorData, setEditorData] = useState<z.infer<typeof AnimeSchema> | null>(null);

    const { currentParams, handlePageChange, handleLimitChange, handleSortingChange, handleFilterChange, handleSearchChange } = 
        useUpdateParams(DEFAULT_ANIME_PARAMS, Object.entries(DEFAULT_ANIME_PARAMS).map(([key, _]) => key));

    const filters = {
        page: parseInt(currentParams.page), 
        limit: parseInt(currentParams.limit), 
        search: currentParams.search,
        sorting: currentParams.sorting, 
        animeType: currentParams.animeType, 
        animeStatus: currentParams.animeStatus
    }

    const { data, isLoading } = useAnime(filters);
    const formInputs = useAnimeForm();
    const columns = useAnimeColumns({
        setOpenEditor: setOpenEditor,
        setEditorData: setEditorData,
    });

    const handleSubmit = (data: z.infer<typeof AnimeSchema>) => {
        console.log(data);
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
        <>
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
            />
            <FormDrawer
                isOpen={openEditor}
                setIsOpen={setOpenEditor}
                data={editorData}
                schema={AnimeSchema}
                formInputs={formInputs}
                onSubmit={handleSubmit}
            />
        </>
    );
}
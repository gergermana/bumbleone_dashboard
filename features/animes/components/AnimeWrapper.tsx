"use client"

import { useState } from "react";
import { z } from "zod/v3";

import { useAnime } from "../hooks/useAnimeQueries";
import { useGenre } from "@/features/genres/hooks/useGenreQueries";

import { getAnimeColumns } from "../config/animeColumns";
import { useUpdateParams } from "@/lib/url";
import { filterItems } from "@/features/animes/config/animeFilters";
import { DEFAULT_ANIME_PARAMS } from "../config/animeConstants";
import { AnimeSchema } from "../validations/animeSchema";

import { DataTable } from "@/components/core";
import { AnimeEditor } from "./editor-main";

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

    const { data, isLoading, isError, error } = useAnime(filters);

    const { data: genresData } = useGenre();
    // const { data: studiosData } = useAllStudios();
    
    return (
        <>
            <DataTable
                data={data?.datalist}
                total={data?.total}
                getColumns={getAnimeColumns}
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
                editorProps={{
                    setOpenEditor,
                    setEditorData,
                }}
            />
            <AnimeEditor
                isOpen={openEditor} 
                setIsOpen={setOpenEditor} 
                data={editorData} 
                genresData={genresData?.datalist}
                // studiosData={studiosData}
            />
        </>
        
    );
}
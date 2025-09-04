"use client"

import { useState } from "react";
import { z } from "zod/v3";

import { useAnime } from "../hooks/use-anime-queries";
import { getAnimeColumns } from "../config/columns";
import { useUpdateParams } from "@/lib/url";
import { filterItems } from "@/features/animes/config/filters";
import { DEFAULT_ANIME_PARAMS } from "../config/constants";
import { AnimeSchema } from "../validations/schema";

import { DataTable } from "@/components/data-table/data-table";
import { AnimeEditor } from "./editor-main";

export default function AnimesWrapper() {
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

    const { data, isLoading, isError } = useAnime(filters);

    // const { data: genresData } = useAllGenres();
    // const { data: studiosData } = useAllStudios();
    
    return (
        <>
            <DataTable
                data={data?.datalist || []}
                total={data?.total}
                getColumns={getAnimeColumns}
                filterItems={filterItems} // Optional
                isLoading={isLoading}
                isError={isError}
                currentParams={{
                    page: currentParams.page,
                    limit: currentParams.limit,
                    search: currentParams.search,
                    sorting: currentParams.sorting,
                }}
                // Optional
                currentFilters={{
                    animeType: currentParams.animeType,
                    animeStatus: currentParams.animeStatus,
                }} 
                handleChangeFns={{
                    handlePageChange,
                    handleLimitChange,
                    handleSearchChange,
                    handleSortingChange,
                    handleFilterChange,  //Optional
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
                // genresData={genresData}
                // studiosData={studiosData}
            />
        </>
        
    );
}
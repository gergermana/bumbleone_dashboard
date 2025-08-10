"use client"

import { useState } from "react";
import { z } from "zod/v3";

import { useAllGenres, useAllStudios, useAnimes } from "./query-hook/use-animes";
import { getAnimeColumns } from "./column/anime-columns";
import { useUpdateParams } from "@/lib/url";
import { filterItems, ANIME_DEFAULT_PARAMS } from "@/features/animes/config/anime-config";
import { AnimeSchema } from "./schema/anime-schema";

import { DataTable } from "@/components/data-table";
import { AnimeEditor } from "./components/anime-editor";

export default function AnimesPageWrapper() {
    const [openEditor, setOpenEditor] = useState(false);
    const [editorData, setEditorData] = useState<z.infer<typeof AnimeSchema> | null>(null);

    const { currentParams, handlePageChange, handleLimitChange, handleSortingChange, handleFilterChange, handleSearchChange } = 
        useUpdateParams(ANIME_DEFAULT_PARAMS, ["page", "limit", "search", "sorting", "animeType", "animeStatus"]);

    const { data, isLoading, isError } = useAnimes(
        parseInt(currentParams.page), 
        parseInt(currentParams.limit), 
        currentParams.search,
        currentParams.sorting, 
        currentParams.animeType, 
        currentParams.animeStatus
    );

    const { data: genresData } = useAllGenres();
    const { data: studiosData } = useAllStudios();
    
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
                currentFilters={{
                    animeType: currentParams.animeType,
                    animeStatus: currentParams.animeStatus,
                }} // Optional
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
                genresData={genresData}
                studiosData={studiosData}
            />
        </>
        
    );
}
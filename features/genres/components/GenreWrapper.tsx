"use client"

import { useState } from "react";
import { z } from "zod/v3";
import { GenreSchema } from "@/features/genres/validations/genreSchema";

import { useGenre } from "../hooks/useGenreQueries";
import { getGenresColumns } from "../config/genreColumns";
import { useUpdateParams } from "@/lib/url";
import { DEFAULT_GENRE_PARAMS } from "../config/genreConstants";

import { DataTable } from "@/components/core";
import { AppDrawer } from "@/components/drawer-edit";

export type GenreTypeWithID = z.infer<typeof GenreSchema>;

export default function GenreWrapper() {
    const [openEditor, setOpenEditor] = useState(false);
    const [editorData, setEditorData] = useState<GenreTypeWithID | null>(null);

    const { currentParams, handlePageChange, handleLimitChange, handleSearchChange, handleSortingChange } = 
        useUpdateParams(DEFAULT_GENRE_PARAMS, Object.entries(DEFAULT_GENRE_PARAMS).map(([key, _]) => key));

    const filters = {
        page: parseInt(currentParams.page), 
        limit: parseInt(currentParams.limit), 
        search: currentParams.search,
        sorting: currentParams.sorting, 
    }

    const { data, isLoading, isError } = useGenre(filters);
    
    return (
        <>
            <DataTable
                data={data?.datalist || []}
                total={data?.total}
                getColumns={getGenresColumns}
                isLoading={isLoading}
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
                editorProps={{
                    setOpenEditor,
                    setEditorData,
                }}
            />
            <AppDrawer isOpen={openEditor} setIsOpen={setOpenEditor} data={editorData}/>
        </>
        
    );
}
"use client"

import { useState } from "react";
import { z } from "zod/v3";
import { GenreSchema } from "@/features/genres/validations/genreSchema";

import { useGenre } from "../hooks/useGenreQueries";
import useGenreColumns from "../hooks/useGenreColumns";
import { useUpdateParams } from "@/lib/url";
import { DEFAULT_GENRE_PARAMS } from "../config/genreConstants";

import { DataTable } from "@/components/core";

export type GenreTypeWithID = z.infer<typeof GenreSchema>;

export default function GenreWrapper() {
    const [openEditor, setOpenEditor] = useState(false);
    const [editorData, setEditorData] = useState<GenreTypeWithID | null>(null);

    const { currentParams, handlePageChange, handleLimitChange, handleSearchChange, handleSortingChange } = 
        useUpdateParams(DEFAULT_GENRE_PARAMS);

    const filters = {
        page: parseInt(currentParams.page), 
        limit: parseInt(currentParams.limit), 
        search: currentParams.search,
        sorting: currentParams.sorting, 
    }

    const { data, isLoading } = useGenre(filters);
    const columns = useGenreColumns({
        setOpenEditor: setOpenEditor,
        setEditorData: setEditorData,
    });
    
    return (
        <>
            <DataTable
                data={data?.datalist || []}
                total={data?.total}
                getColumns={columns}
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
            />
            {/* <AppDrawer isOpen={openEditor} setIsOpen={setOpenEditor} data={editorData}/> */}
        </>
        
    );
}
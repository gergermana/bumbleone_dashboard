"use client"

import { useState } from "react";
import { z } from "zod/v3";
import { GenreSchema } from "@/features/genres/validations/schema";

import { useGenre } from "../hooks/use-genre-queries";
import { getGenresColumns } from "../config/columns";
import { useUpdateParams } from "@/lib/url";
import { DEFAULT_GENRE_PARAMS } from "../config/constants";

import { DataTable } from "@/components/data-table/data-table";
import { AppDrawer } from "@/components/app-drawer";

export type GenreTypeWithID = z.infer<typeof GenreSchema> & { id: number };

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
                isError={isError}
                currentParams={{
                    page: currentParams.page,
                    limit: currentParams.limit,
                    search: currentParams.search,
                    sorting: currentParams.sorting,
                }}
                handleChangeFns={{
                    handlePageChange,
                    handleLimitChange,
                    handleSearchChange,
                    handleSortingChange,
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
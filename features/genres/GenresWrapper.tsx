"use client"

import { useState } from "react";
import { z } from "zod/v3";
import { GenreSchema } from "@/features/genres/genres-schema";

import { useGenres } from "./genres-api-hook";
import { getGenresColumns } from "./genres-columns";
import { useUpdateParams } from "@/lib/url";
import { GENRE_DEFAULT_PARAMS } from "@/configs/genre-config";

import { DataTable } from "@/components/data-table/data-table";
import { AppDrawer } from "@/components/app-drawer";

export type GenreTypeWithID = z.infer<typeof GenreSchema> & { id: number };

export default function GenresWrapper() {
    const [openEditor, setOpenEditor] = useState(false);
    const [editorData, setEditorData] = useState<GenreTypeWithID | null>(null);

    const { currentParams, handlePageChange, handleLimitChange, handleSearchChange, handleSortingChange } = 
        useUpdateParams(GENRE_DEFAULT_PARAMS, ["page", "limit", "search", "sorting"]);

    const { data, isLoading, isError } = useGenres(
        parseInt(currentParams.page), 
        parseInt(currentParams.limit), 
        currentParams.search,
        currentParams.sorting, 
    );

    console.log(data);
    
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
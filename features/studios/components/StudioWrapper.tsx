"use client";

import { useState } from "react";
import { z } from "zod/v3";
import { StudioSchema } from "../validations/studioSchema";
import { DEFAULT_Studio_PARAMS } from "../config/studioConstants";
import { useUpdateParams } from "@/lib/url";
import { useStudio } from "../hooks/useStudioQueries";
import { AppDrawer } from "@/components/drawer-edit";
import { getStudioColumns } from "../config/studioColumns";
import { DataTable } from "@/components/core";

export type StudioType = z.infer<typeof StudioSchema>;

export default function StudioWrapper() {
    const [openEditor, setOpenEditor] = useState(false);
    const [editorData, setEditorData] = useState<StudioType | null>(null);

    const { currentParams, handlePageChange, handleLimitChange, handleSearchChange, handleSortingChange } = 
        useUpdateParams(DEFAULT_Studio_PARAMS, Object.entries(DEFAULT_Studio_PARAMS).map(([key, _]) => key));

    const filters = {
        page: parseInt(currentParams.page), 
        limit: parseInt(currentParams.limit), 
        search: currentParams.search,
        sorting: currentParams.sorting, 
    }

    const { data, isLoading, isError } = useStudio(filters);

    return (
        <>
            <DataTable
                data={data?.datalist || []}
                total={data?.total}
                getColumns={getStudioColumns}
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
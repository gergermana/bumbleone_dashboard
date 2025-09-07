"use client";

import { useState } from "react";
import { z } from "zod/v3";
import { StudioSchema } from "../validations/studio-schema";
import { DEFAULT_Studio_PARAMS } from "../config/constants";
import { useUpdateParams } from "@/lib/url";
import { useStudio } from "../hooks/use-studio-queries";
import { AppDrawer } from "@/components/app-drawer";
import { getStudioColumns } from "../config/columns";
import { DataTable } from "@/components/data-table/data-table";

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
                isError={isError}
                currentParams={{
                    page: currentParams.page,
                    limit: currentParams.limit,
                    search: currentParams.search,
                    sorting: currentParams.sorting,
                }}
                // Optional
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
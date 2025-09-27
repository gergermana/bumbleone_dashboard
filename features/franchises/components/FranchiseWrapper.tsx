"use client"

import { useState } from "react";

import { useUpdateParams } from "@/lib/url";

import { useFranchise } from "../hooks/useFranchiseQueries";
import { getFranchiseColumns } from "../hooks/getFranchiseColumns";

import { DEFAULT_FRANCHISE_PARAMS } from "../config/franchiseConstants";
import { FranchiseType } from "../validations/franchiseSchema";

import { DataTable, Drawer } from "@/components/core";
import { FranchiseAddForm } from "../forms/FranchiseAddForm";
import { ListPlus, SquarePen } from "lucide-react";
import { FranchiseEditForm } from "../forms/FranchiseEditForm";
import { FranchiseViewForm } from "../forms/FranchiseViewForm";

export type FranchiseDrawerStateType = "closed" | "view" | "add" | "edit";
export type FranchiseSetDrawerStateType = React.Dispatch<React.SetStateAction<FranchiseDrawerStateType>>;
export type FranchiseSetDrawerDataType = React.Dispatch<React.SetStateAction<FranchiseType | null>>

export default function FranchiseWrapper() {
    const [drawerState, setDrawerState] = useState<FranchiseDrawerStateType>("closed");
    const [drawerData, setDrawerData] = useState<FranchiseType | null>(null);
    const columns = getFranchiseColumns({ setDrawerState, setDrawerData });

    const { currentParams, handlePageChange, handleLimitChange, handleSortingChange, handleFilterChange, handleSearchChange } = 
        useUpdateParams(DEFAULT_FRANCHISE_PARAMS);

    const filters = {
        page: currentParams.page, 
        limit: currentParams.limit, 
        search: currentParams.search,
        sorting: currentParams.sorting, 
    }

    const { data, isLoading } = useFranchise(filters);
    console.log(data);  
    // Do for the count entries input in viewer drawer
    return (
        <>
            <DataTable<FranchiseType, FranchiseDrawerStateType>
                data={data?.datalist}
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
                stateProps={{
                    setState: setDrawerState,
                }}
            />
            <Drawer
                isOpen={drawerState === 'view'}
                setIsOpen={() => setDrawerState('closed')}
                label="View Franchise Detail"
                icon={ListPlus}
                content={<FranchiseViewForm data={drawerData}/>}
            />
            <Drawer
                isOpen={drawerState === 'add'}
                setIsOpen={() => setDrawerState('closed')}
                label="Create Franchise"
                icon={ListPlus}
                content={<FranchiseAddForm/>}
            />
            <Drawer
                isOpen={drawerState === 'edit'}
                setIsOpen={() => setDrawerState('closed')}
                label="Edit Franchise"
                icon={SquarePen}
                content={<FranchiseEditForm data={drawerData}/>}
            />
        </>
    );
}
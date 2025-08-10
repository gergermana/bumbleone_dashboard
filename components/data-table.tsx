"use client"

import { useMemo, useState } from "react";
import { ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, useReactTable, VisibilityState } from "@tanstack/react-table";

import { DataTableHeader } from "./data-table-header";
import { DataTableFooter } from "./data-table-footer";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Skeleton } from "@/components/ui/skeleton";

import { type LucideIcon } from "lucide-react";

export type FilterItemsConfig = {
    label: string;
    type: string;
    defaultValue: string;
    icon?: LucideIcon;
    options: { key: string, label: string }[];
};

export type HandleChangeFns = {
    handlePageChange: (newPage: number) => void;
    handleLimitChange: (newLimit: number) => void;
    handleSearchChange: (newSearch: string) => void;
    handleSortingChange: (newSorting: string) => void;
    handleFilterChange?: (newFilter: string, type: string) => void;
}

interface DataTableProps<TData extends { id: number }> {
    data: TData[];
    total: number;
    getColumns: (
        setEditOpen?: React.Dispatch<React.SetStateAction<boolean>>,
        setEditData?: React.Dispatch<React.SetStateAction<TData | null>>
    ) => ColumnDef<TData>[];
    filterItems?: FilterItemsConfig[];
    isLoading: boolean;
    isError: boolean;
    currentParams: Record<string, string>;
    currentFilters?: Record<string, string>;
    handleChangeFns: HandleChangeFns;
    editorProps?: {
        setOpenEditor?: React.Dispatch<React.SetStateAction<boolean>>,
        setEditorData?: React.Dispatch<React.SetStateAction<TData | null>>,
    };
}

export function DataTable<TData extends { id: number }>({ 
    data, 
    total, 
    getColumns, 
    filterItems, 
    isLoading, 
    currentParams, 
    currentFilters, 
    handleChangeFns,
    editorProps,
}: DataTableProps<TData>) {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState({});

    const columns = useMemo(() => getColumns(editorProps?.setOpenEditor, editorProps?.setEditorData), [getColumns]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onRowSelectionChange: setRowSelection,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        state: {
            rowSelection: rowSelection,
            columnFilters,
            columnVisibility,
        }
    });

    return (
        <>
            <div className="flex flex-col justify-start gap-4">
                <DataTableHeader 
                    table={table} 
                    filterItems={filterItems} 
                    search={currentParams.search} 
                    sorting={currentParams.sorting} 
                    currentFilters={currentFilters} 
                    onSearchChange={handleChangeFns.handleSearchChange}
                    onSortingChange={handleChangeFns.handleSortingChange} 
                    onFilterChange={handleChangeFns.handleFilterChange} 
                />
                <div className="overflow-hidden rounded-lg border">
                    <Table>
                        <TableHeader className="bg-muted">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead key={header.id} className="px-4 h-11">
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                )}
                                            </TableHead>
                                        );
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody className="**:data-[slot=table-cell]:first:w-16">
                            {isLoading ? (
                                [...Array(currentParams.limit)].map((_, rowIndex) => (
                                    <TableRow key={rowIndex}>
                                        {columns.map((_, colIndex) => (
                                            <TableCell key={colIndex} className="px-4 h-14">
                                                <Skeleton className="h-4 w-full" />
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : table.getRowModel().rows?.length ? (
                                    table.getRowModel().rows.map((row) => (
                                        <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell key={cell.id} className="px-4 h-14">
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-14 text-center">
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <DataTableFooter 
                    total={total} 
                    page={currentParams.page} 
                    limit={currentParams.limit} 
                    onPageChange={handleChangeFns.handlePageChange} 
                    onLimitChange={handleChangeFns.handleLimitChange}
                />
            </div>
        </>
        
    ); 
}
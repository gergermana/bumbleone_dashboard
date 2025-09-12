"use client"

import { useEffect, useMemo, useState } from "react";
import { Table as TableType, ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, useReactTable, VisibilityState } from "@tanstack/react-table";

import { rowsLimitOptions, sortingOptions } from "@/configs/options-config";

import { Plus, Trash } from "lucide-react";

import TableColumnsFilter from "../TableColumnsFilter";
import DataFilter, { DataFilterItemsType } from "../DataFilter";
import { AppSearch } from "../Search";
import { Select, Pagination } from ".";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";

export type onChangeFns = {
    onPageChange: (newPage: number) => void;
    onLimitChange: (newLimit: number) => void;
    onSearchChange: (newSearch: string) => void;
    onSortingChange: (newSorting: string) => void;
    onFilterChange?: (newFilter: string, type: string) => void;
}

interface DataTableProps<TData extends { id: number }> {
    data: TData[];
    total: number;
    getColumns: ColumnDef<TData>[];
    filterItems?: DataFilterItemsType[];
    isLoading: boolean;
    currentParams: {
        page: string,
        limit: string,
        search: string,
        sorting: string,
        filters?: Record<string, string>
    };
    onChangeFns: onChangeFns;
}

export default function DataTable<TData extends { id: number }>({ 
    data = [], 
    total, 
    getColumns, 
    filterItems, 
    isLoading, 
    currentParams, 
    onChangeFns,
}: DataTableProps<TData>) {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState({});

    // const columns = useMemo(() => getColumns(editorProps?.setOpenEditor, editorProps?.setEditorData), [getColumns]);
    const columns = getColumns;

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
        <div className="flex flex-col justify-start gap-4">
            <DataTableHeader 
                table={table} 
                filterItems={filterItems} 
                currentParams={{
                    search: currentParams.search,
                    sorting: currentParams.sorting,
                    filters: currentParams?.filters,
                }}
                onChangeFns={{
                    onSearchChange: onChangeFns.onSearchChange,
                    onSortingChange: onChangeFns.onSortingChange,
                    onFilterChange: onChangeFns.onFilterChange,
                }}
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
                        ) : table.getRowModel().rows?.length > 0 ? (
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
                currentParams={{
                    page: currentParams.page,
                    limit: currentParams.limit,
                }}
                onChangeFns={{
                    onPageChange: onChangeFns.onPageChange,
                    onLimitChange: onChangeFns.onLimitChange,
                }}
            />
        </div>    
    ); 
}

function DataTableHeader<TData>({ 
    table, 
    filterItems, 
    currentParams,
    onChangeFns,
}: {
    table: TableType<TData>;
    filterItems?: DataFilterItemsType[];
    currentParams: {
        search: string,
        sorting: string,
        filters?: Record<string, string>,
    };
    onChangeFns: {
        onSearchChange: (newSearch: string) => void;
        onSortingChange: (newSorting: string) => void;
        onFilterChange?: (newFilter: string, type: string) => void;
    }
}) {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
                <AppSearch search={currentParams.search} onSearchChange={onChangeFns.onSearchChange}/>
                <TableColumnsFilter table={table}/>
                <Button 
                    variant="outline" 
                    size="sm" 
                    disabled={table.getFilteredSelectedRowModel().rows.length > 0 ? false : true}
                    onClick={() => table.getFilteredSelectedRowModel().rows.map(row => {
                        console.log(row.original);
                    })}
                >
                    <Trash/>
                    <span className="hidden lg:inline">Delete</span>
                </Button>
                <Button 
                    variant="outline" 
                    size="sm"
                >
                    <Plus/>
                    <span className="hidden lg:inline">Add Anime</span>
                </Button>
            </div>
            <div className="flex items-center justify-between gap-2">
                <div className="text-muted-foreground font-medium text-sm">
                    {table.getFilteredSelectedRowModel().rows.length} row(s) selected.
                </div>
                <div className="flex items-center gap-2">
                    <Select 
                        value={currentParams.sorting} 
                        options={sortingOptions} 
                        onChange={onChangeFns.onSortingChange}
                    />
                    {filterItems && currentParams.filters && onChangeFns.onFilterChange && 
                        <DataFilter 
                            items={filterItems} 
                            currentFilters={currentParams.filters} 
                            onFilterChange={onChangeFns.onFilterChange}
                        />
                    }
                </div>
            </div>
        </div>
    );
}

function DataTableFooter({ 
    total, 
    currentParams, 
    onChangeFns 
}: {
    total: number;
    currentParams: {
        page: string;
        limit: string;
    }
    onChangeFns: {
        onPageChange: (newPage: number) => void;
        onLimitChange: (newLimit: number) => void;
    }
}) {
    const totalPages = Math.ceil(total / parseInt(currentParams.limit));

    const [pageInput, setPageInput] = useState(currentParams.page);

    useEffect(() => {
        setPageInput(currentParams.page);
    }, [currentParams.page])

    const handlePageJump = () => {
        const parsed = parseInt(pageInput);
        if (!isNaN(parsed) && parsed >= 1 && totalPages >= parsed) {
            onChangeFns.onPageChange(parsed);
        } else {
            setPageInput(currentParams.page);
        }
    }
    
    return (
        <>
            <div className="flex items-center text-sm font-medium text-muted-foreground gap-4">
                <div className="items-center gap-2 hidden lg:flex">
                    Page {currentParams.page} of {totalPages}
                </div>
                <Separator orientation="vertical" className="hidden lg:inline"/>
                <div className="flex items-center gap-2">
                    Go to page:  
                    <Input 
                        className="w-14 h-8 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none" 
                        type="number"
                        value={pageInput}
                        onChange={(e) => setPageInput(e.target.value)}
                    />
                    <Button size="sm" variant="outline" onClick={handlePageJump} disabled={currentParams.page === pageInput}>Go</Button>
                </div>
                <div className="flex items-center gap-2 ml-auto">
                    <span>Rows</span>
                    <span className="hidden md:inline">Per Page</span>
                    <Select 
                        value={currentParams.limit.toString()}
                        options={rowsLimitOptions}
                        onChange={(selectedVal: string) => onChangeFns.onLimitChange(parseInt(selectedVal))}
                    />
                </div>
            </div>
            <Pagination totalPages={totalPages} page={currentParams.page} onPageChange={onChangeFns.onPageChange}/>
        </>
    );
}
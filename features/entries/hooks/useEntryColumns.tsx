import { z } from "zod";
import { EntrySchema } from "../validations/entrySchema"
import { ColumnDef } from "@tanstack/react-table";

import { ENTRY_TYPES_LABELS, ENTRY_STATUS_LABELS, ENTRY_TYPES_COLOR, ENTRY_STATUS_COLOR } from "../config/entryConstants";

import { CellActionsMenu, CellBadge, CellCheckbox, CellPrimary, CellSecondary, CellViewer, HeaderCheckbox } from "@/components/DataTableCellHelper";
import { getEntryActions } from "./getEntryActions";

export function useEntryColumns({
    setDrawerState,
    setDrawerData,
}: {
    setDrawerState: React.Dispatch<React.SetStateAction<"closed" | "edit" | "add">>,
    setDrawerData: React.Dispatch<React.SetStateAction<z.infer<typeof EntrySchema> | null>>,
}): ColumnDef<z.infer<typeof EntrySchema>>[] {
    const column: ColumnDef<z.infer<typeof EntrySchema>>[] = [
        {
            id: "select",
            header: ({ table }) => <HeaderCheckbox table={table}/>,
            cell: ({ row }) => <CellCheckbox row={row}/>,
        }, {
            accessorKey: "id",
            header: "ID",
            cell: ({ row }) => <CellPrimary value={row.original.id}/>,
        }, {
            accessorKey: "englishTitle",
            header: "English Title",
            cell: ({ row }) => 
                <CellViewer 
                    value={row.original.englishTitle}
                    onClick={() => {
                        setDrawerState("edit");
                        setDrawerData(row.original);
                    }}
                />,
        }, {
            accessorKey: "slug",
            header: "Slug",
            cell: ({ row }) => <CellSecondary value={row.original.slug}/>,
        }, {
            accessorKey: "franchiseId",
            header: "Franchise ID",
            cell: ({ row }) => <CellPrimary value={row.original.franchiseId}/>,
        }, {
            accessorKey: "sortOrder",
            header: "Sort Order",
            cell: ({ row }) => <CellPrimary value={row.original.sortOrder ?? undefined}/>,
        }, {
            accessorKey: "type",
            header: "Type",
            cell: ({ row }) => row.original.type ? (
                <CellBadge
                    value={ENTRY_TYPES_LABELS[row.original.type]}
                    color={ENTRY_TYPES_COLOR[row.original.type]}
                />
            ) : (
                <CellPrimary/>
            ),
        }, {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => row.original.status ? (
                <CellBadge
                    icon="dot"
                    value={ENTRY_STATUS_LABELS[row.original.status]}
                    color={ENTRY_STATUS_COLOR[row.original.status]}
                />
            ): (
                <CellPrimary/>
            )
        }, {
            accessorKey: "actions",
            header: "Actions",
            cell: ({ row }) => {
                const entryActions = getEntryActions({ row, setDrawerState, setDrawerData });
                return <CellActionsMenu actions={entryActions}/>
            },
        },
    ]
    
    return column;
}
import { ColumnDef } from "@tanstack/react-table";
import { getFranchiseActions } from "./getFranchiseActions";

import { FranchiseSetDrawerStateType, FranchiseSetDrawerDataType } from "../components/FranchiseWrapper";
import { FranchiseType } from "../validations/franchiseSchema";

import { CellActionsMenu, CellCheckbox, CellPrimary, CellSecondary, CellViewer, HeaderCheckbox } from "@/components/DataTableCellHelper";

export function getFranchiseColumns({
    setDrawerState,
    setDrawerData,
}: {
    setDrawerState: FranchiseSetDrawerStateType,
    setDrawerData: FranchiseSetDrawerDataType,
}): ColumnDef<FranchiseType>[] {
    const column: ColumnDef<FranchiseType>[] = [
        {
            id: "select",
            header: ({ table }) => <HeaderCheckbox table={table}/>,
            cell: ({ row }) => <CellCheckbox row={row}/>,
        }, {
            accessorKey: "id",
            header: "ID",
            cell: ({ row }) => <CellPrimary value={row.original.id}/>,
        }, {
            accessorKey: "title",
            header: "Title",
            cell: ({ row }) => 
                <CellViewer 
                    value={row.original.title}
                    onClick={() => {
                        setDrawerState("view");
                        setDrawerData(row.original);
                    }}
                />,
        }, {
            accessorKey: "slug",
            header: "Slug",
            cell: ({ row }) => <CellSecondary value={row.original.slug}/>
        }, {
            accessorKey: "originalTitle",
            header: "Original Title",
            cell: ({ row }) => <CellPrimary value={row.original.originalTitle}/>
        }, {
            accessorKey: "startYear",
            header: "Start Year",
            cell: ({ row }) => <CellPrimary value={row.original.startYear}/>
        }, {
            accessorKey: "endYear",
            header: "End Year",
            cell: ({ row }) => <CellPrimary value={row.original.endYear}/>
        }, {
            accessorKey: "entriesCount",
            header: "Total Entries",
            cell: ({ row }) => <CellPrimary value={row.original._count.entries}/>
        }, {
            accessorKey: "actions",
            header: "Actions",
            cell: ({ row }) => {
                const franchiseActions = getFranchiseActions({ row, setDrawerState, setDrawerData });
                return <CellActionsMenu actions={franchiseActions}/>
            }
        },
    ]

    return column;
}
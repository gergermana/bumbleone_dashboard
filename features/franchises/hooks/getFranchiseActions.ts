import { FranchiseSetDrawerStateType, FranchiseSetDrawerDataType } from "../components/FranchiseWrapper";
import { ActionsDataType } from "@/components/core/DropdownMenu";

import { Eye, ListOrdered, SquarePen, Trash } from "lucide-react";

export function getFranchiseActions({ 
    row, 
    setDrawerState, 
    setDrawerData 
}: { 
    row: any, 
    setDrawerState: FranchiseSetDrawerStateType, 
    setDrawerData: FranchiseSetDrawerDataType,
}): ActionsDataType {
    const actions: ActionsDataType = {
        actionPrimary: [
            {
                title: "Edit",
                icon: SquarePen,
                onClick: () => {
                    setDrawerState("edit");
                    setDrawerData(row.original)
                },
            },
            {
                title: "View",
                icon: Eye,
                onClick: () => {
                    setDrawerState("view");
                    setDrawerData(row.original);
                }
            },
            {
                title: "Entries",
                icon: ListOrdered,
                url: `/dashboard/franchises/${row.original.id}`,
            },
        ],
        actionSecondary: [
            {
                title: "Delete",
                icon: Trash,
            },
        ],
    }

    return actions;
}
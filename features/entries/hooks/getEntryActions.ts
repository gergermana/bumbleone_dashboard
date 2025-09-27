import { SquarePen, Eye, ListOrdered, Layers, Trash } from "lucide-react"

export function getEntryActions({ 
    row, 
    setDrawerState,
    setDrawerData,
}: { 
    row: any, 
    setDrawerState: any,
    setDrawerData: any,
}) {
    const actions = {
        actionMain: [
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
            },
            {
                title: "Episodes",
                icon: ListOrdered,
            },
            {
                title: "Seasons",
                icon: Layers,
            },
        ],
        actionSecondary: [
            {
                title: "Delete",
                icon: Trash,
            }
        ],
    }

    return actions;
}
import { z } from "zod/v3";
import { StudioSchema } from "../validations/studioSchema";
import { ColumnDef } from "@tanstack/react-table";

import { SquarePen, Trash } from "lucide-react";

import { ActionDropdown } from "@/components/ActionsMenu";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

export default function useStudioColumns({
    setOpenEditor,
    setEditorData,
}: {
    setOpenEditor: React.Dispatch<React.SetStateAction<boolean>>,
    setEditorData: React.Dispatch<React.SetStateAction<z.infer<typeof StudioSchema> | null>>,
}): ColumnDef<z.infer<typeof StudioSchema>>[] {
    const column: ColumnDef<z.infer<typeof StudioSchema>>[] = [
        {
            id: "select",
            header: ({ table }) => (
                <div 
                    className="flex items-center justify-center h-full w-10 cursor-pointer"
                    onClick={() => 
                        table.toggleAllPageRowsSelected(
                            !table.getIsAllPageRowsSelected()
                        )
                    }
                >
                    <Checkbox
                        checked={
                            table.getIsAllPageRowsSelected() ||
                            (table.getIsSomePageRowsSelected() && "indeterminate")
                        }
                        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                        aria-label="Select all"
                        className="cursor-pointer"
                    />
                </div>
            ),
            cell: ({ row }) => (
                <div 
                    className="flex items-center justify-center h-full w-10 cursor-pointer"
                    onClick={() => 
                        row.toggleSelected(
                            !row.getIsSelected()
                        )
                    }
                >
                    <Checkbox
                        checked={row.getIsSelected()}
                        onCheckedChange={(value) => row.toggleSelected(!!value)}
                        aria-label="Select row"
                        className="cursor-pointer"
                    />
                </div>
            ),
        }, {
            accessorKey: "id",
            header: "ID",
            cell: ({ row }) => (
                <div className="flex items-center">
                    {row.original.id}.
                </div>
            )
        }, {
            accessorKey: "name",
            header: "Name",
            cell: ({ row }) => {
                return (
                    <Button 
                        variant="link" 
                        className="p-0 font-semibold cursor-pointer h-full min-w-[180px] text-start line-clamp-3 break-all whitespace-normal" 
                        onClick={() => {
                            setEditorData?.(row.original);
                            setOpenEditor?.(true);
                        }}
                    >
                            {row.original.name}
                    </Button>
                );
            }
        }, {
            accessorKey: "actions",
            header: "Actions",
            cell: ({ row }) => {
                const actionsData = {
                    actionMain: [
                        {
                            title: "Edit",
                            icon: SquarePen,
                            onClick: () => {
                                setEditorData?.(row.original);
                                setOpenEditor?.(true);
                            },
                        },
                    ],
                    actionSecondary: [
                        {
                            title: "Delete",
                            icon: Trash,
                        }
                    ],
                }
                return (
                    <div className="flex items-center">
                        <ActionDropdown actionsData={actionsData}/>
                    </div>
                );
            }
        }
    ]
    
    return column;
}
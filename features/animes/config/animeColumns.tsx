"use client"

import { ColumnDef } from "@tanstack/react-table";
import { AnimeSchema } from "../validations/animeSchema";
import { z } from "zod/v3";

import { Eye, Layers, ListOrdered, SquarePen, Trash } from "lucide-react";

import { ActionDropdown } from "@/components/data-table/DataTableActions";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

import { ANIME_TYPES_LABELS, ANIME_STATUS_LABELS } from "./animeConstants";
import { Badge } from "@/components/core";

export const getAnimeColumns = (
    setOpenEditor?: React.Dispatch<React.SetStateAction<boolean>>,
    setEditorData?: React.Dispatch<React.SetStateAction<z.infer<typeof AnimeSchema> | null>>,
): ColumnDef<z.infer<typeof AnimeSchema>>[] => [
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
        accessorKey: "titleEnglish",
        header: "Title English",
        cell: ({ row }) => {
            return (
                <Button 
                    variant="link" 
                    className="p-0 text-foreground cursor-pointer h-full min-w-[180px] text-start line-clamp-3 break-all whitespace-normal" 
                    onClick={() => {
                        setEditorData?.(row.original);
                        setOpenEditor?.(true);
                    }}
                >
                        {row.original.titleEnglish}
                </Button>
            );
        }
    }, {
        accessorKey: "slug",
        header: "Slug",
        cell: ({ row }) => (
            <div className="text-muted-foreground min-w-[180px] line-clamp-3 break-all whitespace-normal">
                {row.original.slug}
            </div>
        )
    }, {
        accessorKey: "franchiseKey",
        header: () => "Franchise Key",
        cell: ({ row }) => (
            <div className="min-w-[180px] line-clamp-3 break-all whitespace-normal">
                {row.original.franchiseKey || "-"}
            </div>
        )
    }, {
        accessorKey: "franchiseOrder",
        header: () => "Franchise Order",
        cell: ({ row }) => (
            <div className="flex items-center">
                {row.original.franchiseOrder || "-"}
            </div>
        )
    }, {
        accessorKey: "anilistId",
        header: "AnilistID",
        cell: ({ row }) => (
            <div className="flex items-center">
                {row.original.anilistId || "-"}
            </div>
        )
    }, {
        accessorKey: "animeType",
        header: "Anime Type",
        cell: ({ row }) => {
            const animeType = row.original.animeType;
            const badge = () => {
                let color: string = "";
                switch (animeType) {
                    case "MOVIE":
                        color = "text-red-500";
                        break;
                    case "TV": 
                        color = "text-indigo-500";
                        break;
                    case "OVA": 
                        color = "text-purple-500";
                        break;
                    case "SPECIAL": 
                        color = "text-yellow-500";
                        break;
                    case "SEQUEL": 
                        color = "text-green-500";
                        break;
                }
                return <Badge variant="outline" className={{ content: color }} content={ANIME_TYPES_LABELS[animeType]}/>;
            } 
            return (
                <div className="flex items-center">
                    {badge()}
                </div>
            );
        }
    }, {
        accessorKey: "animeStatus",
        header: "Anime Status",
        cell: ({ row }) => {
            const animeStatus = row.original.animeStatus;
            const badge = () => {
                let color: string = "";
                switch (animeStatus) {
                    case "UPCOMING": 
                        color = "bg-blue-500";
                        break;
                    case "ONGOING": 
                        color = "bg-green-500";
                        break;
                    case "CANCELLED":
                        color = "bg-red-500";
                        break;
                    case "HIATUS": 
                        color = "bg-yellow-500";
                        break;
                }
                return <Badge variant="outline" className={{ dot: color }} content={ANIME_STATUS_LABELS[animeStatus]} icon={true}/>;
            } 
            return (
                <div className="flex items-center">
                    {badge()}
                </div>
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
            return (
                <>
                    <div className="flex items-center">
                        <ActionDropdown actionsData={actionsData}/>
                    </div>
                </>
            );
        }
    }
];

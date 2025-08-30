import { SlidersHorizontal } from "lucide-react";
import { animeTypeOptions, animeTypeLabel, animeStatusOptions, animeStatusLabel } from "./constants";

export const filterItems = [
    {
        label: "Type",
        type: "animeType",
        defaultValue: "All",
        icon: SlidersHorizontal,
        options: [
            { key: "ALL", label: "All" },
            ...Object.values(animeTypeOptions).map(type => ({
                key: type,
                label: animeTypeLabel[type], 
            }))
        ],
    },
    {
        label: "Status",
        type: "animeStatus",
        defaultValue: "All",
        icon: SlidersHorizontal,
        options: [
            { key: "ALL", label: "All" },
            ...Object.values(animeStatusOptions).map(status => ({
                key: status,
                label: animeStatusLabel[status], 
            }))
        ],
    }
];
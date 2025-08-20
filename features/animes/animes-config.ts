import { SlidersHorizontal } from "lucide-react";
import { 
    animeTypeOptions, animeTypeLabel, 
    animeStatusOptions, animeStatusLabel 
} from "./animes-schema";


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

export const ANIME_DEFAULT_PARAMS = {
    page: "1",
    limit: "20", 
    search: "",
    sorting: "LATEST",
    animeType: "ALL",
    animeStatus: "ALL",
} as const;
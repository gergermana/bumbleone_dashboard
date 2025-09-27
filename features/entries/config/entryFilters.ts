import { SlidersHorizontal } from "lucide-react";

export const filterItems = [
    {
        label: "Type",
        type: "animeType",
        defaultValue: "All",
        icon: SlidersHorizontal,
        options: [
            { key: "ALL", label: "All" },
            { key: "TV", label: "TV" },
            { key: "MOVIE", label: "Movie"},
            { key: "OVA", label: "Ova" },
            { key: "SPECIAL", label: "Special" },
            { key: "SEQUEL", label: "Sequel" },
        ],
    },
    {
        label: "Status",
        type: "animeStatus",
        defaultValue: "All",
        icon: SlidersHorizontal,
        options: [
            { key: "ALL", label: "All" },
            { key: "UPCOMING", label: "Upcoming" },
            { key: "ONGOING", label: "Ongoing"},
            { key: "COMPLETED", label: "Completed" },
            { key: "CANCELLED", label: "Cancelled" },
            { key: "HIATUS", label: "Hiatus" },
        ],
    }
];
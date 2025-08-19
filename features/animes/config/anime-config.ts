import { animeTypeOptions, animeTypeLabel, animeStatusOptions, animeStatusLabel } from "../animes-schema";
import { SlidersHorizontal } from "lucide-react";

export const filterItems = [
    {
        label: "Type",
        type: "animeType",
        defaultValue: "All",
        icon: SlidersHorizontal,
        options: [
            { key: "ALL", label: "All" },
            ...animeTypeOptions.map(type => ({
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
            ...animeStatusOptions.map(status => ({
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

// export const AnimeSchema = z.object({
//     anilistId: z.number().optional(),
//     franchiseKey: z.string().optional(),
//     franchiseOrder: z.number().optional(),
//     titleEnglish: z.string().min(1, "Title is required"),
//     slug: z.string().min(1, "Slug is required"),
//     titleJapanese: z.string().optional(),
//     titleAlternative: z.array(z.string()).optional(),
//     aired: z.string().optional(),
//     premiered: z.string().optional(),
//     animeType: z.enum(animeTypeOptions, { required_error: "Anime Type is required" }),
//     animeStatus: z.enum(animeStatusOptions, { required_error: "Anime Status is required" }),
//     coverImg: z.string().url().optional(),
//     bannerImg: z.string().url().optional(),
//     overview: z.string().optional(),
//     genres: z.array(z.number()).min(1, "At least one genre is required"),
//     studios: z.array(z.number()).min(1, "At least one studio is required"),
// });

type AnimeFormInput = {
    key: "id" | "anilistId" | "franchiseKey" | "franchiseOrder" | "slug" | "titleEnglish" | "titleJapanese" | "titleAlternative" | "animeType" | "animeStatus" | "aired" | "premiered" | "overview" | "coverImg" | "bannerImg" | "genres" | "studios" | "createdAt" | "updatedAt";
    label: string;
    type: "text" | "number" | "combobox" | "readonly"; // Add more types as necessary
};

export const animeFormInputs: AnimeFormInput[] = [
    { key: "id", label: "ID", type: "readonly" },
    { key: "anilistId", label: "Anilist ID", type: "number" },
    { key: "franchiseKey", label: "Franchise Key", type: "text" },
    { key: "franchiseOrder", label: "Franchise Order", type: "number" },
    { key: "slug", label: "Slug", type: "text" },
    { key: "titleEnglish", label: "English Title", type: "text" },
    { key: "titleJapanese", label: "Japanese Title", type: "text" },
    { key: "titleAlternative", label: "Alternative Titles", type: "text" },
    { key: "animeType", label: "Anime Type", type: "text" },
    { key: "animeStatus", label: "Anime Status", type: "text" },
    { key: "aired", label: "Aired", type: "text" },
    { key: "premiered", label: "Premiered", type: "text" },
    { key: "coverImg", label: "Cover Image", type: "text" },
    { key: "bannerImg", label: "Banner Image", type: "text" },
    { key: "genres", label: "Genres", type: "combobox" },
    { key: "studios", label: "Studios", type: "combobox" },
    { key: "overview", label: "Overview", type: "text" },
    { key: "createdAt", label: "Created At", type: "readonly" },
    { key: "updatedAt", label: "Updated At", type: "readonly" },
]
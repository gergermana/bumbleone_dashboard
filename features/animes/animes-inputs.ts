import { z }from "zod/v3"
import { AnimeSchema } from "./animes-schema"
import { InputType } from "@/types/input-type";

type AnimesInputsType = {
    key: keyof z.infer<typeof AnimeSchema>;
    label: string;
    type: InputType;
}

export const animesInputs: AnimesInputsType[] = [
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
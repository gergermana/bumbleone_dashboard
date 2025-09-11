import { z }from "zod/v3"
import { AnimeSchema } from "../validations/animeSchema"
import { InputType } from "@/types/input-type";
import { ANIME_TYPES_LABELS, ANIME_STATUS_LABELS } from "../config/animeConstants";
import { useGenre } from "@/features/genres/hooks/useGenreQueries";
import { useStudio } from "@/features/studios/hooks/useStudioQueries";

type AnimeFormType = {
    key: keyof z.infer<typeof AnimeSchema>;
    label: string;
    type: InputType;
    options?: any;
}

const animeTypeOptions = Object.entries(ANIME_TYPES_LABELS).map(([key, val]) => ({ key: key, label: val }));
const animeStatusOptions = Object.entries(ANIME_STATUS_LABELS).map(([key, val]) => ({ key: key, label: val }));

export default function useAnimeForm() {
    const { data: genres } = useGenre();
    const { data: studios } = useStudio();

    const genresData = genres?.datalist.map((g: any) => ({ id: g.id, name: g.name }));
    const studiosData = studios?.datalist.map((s: any) => ({ id: s.id, name: s.name }));

    const animeForm: AnimeFormType[] = [
        { key: "id", label: "ID", type: "readonly" },
        { key: "anilistId", label: "Anilist ID", type: "number" },
        { key: "franchiseKey", label: "Franchise Key", type: "text" },
        { key: "franchiseOrder", label: "Franchise Order", type: "number" },
        { key: "slug", label: "Slug", type: "text" },
        { key: "titleEnglish", label: "English Title", type: "text" },
        { key: "titleJapanese", label: "Japanese Title", type: "text" },
        { key: "titleAlternative", label: "Alternative Titles", type: "text" },
        { key: "animeType", label: "Anime Type", type: "select", options: animeTypeOptions },
        { key: "animeStatus", label: "Anime Status", type: "select", options: animeStatusOptions },
        { key: "aired", label: "Aired", type: "text" },
        { key: "premiered", label: "Premiered", type: "text" },
        { key: "coverImg", label: "Cover Image", type: "text" },
        { key: "bannerImg", label: "Banner Image", type: "text" },
        { key: "genres", label: "Genres", type: "combobox", options: genresData },
        { key: "studios", label: "Studios", type: "combobox", options: studiosData },
        { key: "overview", label: "Overview", type: "text" },
        { key: "createdAt", label: "Created At", type: "readonly" },
        { key: "updatedAt", label: "Updated At", type: "readonly" },
    ];

    return animeForm; 
}

import { z } from "zod/v3";

import {
    requiredString, optionalString,
    optionalIntegerNumber,
    requiredEnum, 
    requiredUrl,
    optionalStringArray,
    requiredNumberArray,
} from "@/lib/schema-helper";

export const animeTypeOptions = ['TV', 'MOVIE', 'OVA', 'SPECIAL', 'SEQUEL'] as const;
export const animeTypeLabel = {
    MOVIE: "Movie",
    TV: "TV",
    OVA: "Ova",
    SPECIAL: "Special",
    SEQUEL: "Sequel",
}

export const animeStatusOptions = ['UPCOMING', 'ONGOING', 'COMPLETED', 'CANCELLED', 'HIATUS'] as const;
export const animeStatusLabel = {
    UPCOMING: "Upcoming",
    ONGOING: "Ongoing",
    COMPLETED: "Completed",
    CANCELLED: "Cancelled",
    HIATUS: "Hiatus",
}

export const AnimeSchema = z.object({
    id: z.number().readonly(),
    anilistId: optionalIntegerNumber('AnilistID'),
    franchiseKey: optionalString('FranchiseKey'),
    franchiseOrder: optionalIntegerNumber('FranchiseOrder'),
    titleEnglish: requiredString('TitleEnglish'),
    slug: requiredString('Slug'),
    titleJapanese: optionalString('TitleJapanese'),
    titleAlternative: optionalStringArray('TitleAlternative'),
    aired: optionalString('Aired'),
    premiered: optionalString('Premiered'),
    animeType: requiredEnum(animeTypeOptions, 'AnimeType'),
    animeStatus: requiredEnum(animeStatusOptions, 'AnimeStatus'),
    coverImg: requiredUrl('CoverImg'),
    bannerImg: requiredUrl('BannerImg'),
    overview: optionalString('Overview'),
    genres: requiredNumberArray('Genre'),
    studios: requiredNumberArray('Studio'),
    createdAt: z.string().readonly(),
    updatedAt: z.string().readonly(),
});

// export const AnimeSchema = z.object({
//     id: z.number().readonly(),
//     anilistId: z.number().optional().nullable(),
//     franchiseKey: z.string().optional(),
//     franchiseOrder: z.number().optional().nullable(),
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
//     createdAt: z.string(),
//     updatedAt: z.string(),
// });
import { z } from "zod/v3";

import {
    requiredString, optionalString,
    optionalIntegerNumber,
    requiredEnum, 
    requiredUrl,
    optionalStringArray,
    requiredNumberArray,
} from "@/lib/schema-helper";

export const animeTypeOptions = {
    TV: "TV",
    MOVIE: "MOVIE",
    OVA: "OVA",
    SPECIAL: "SPECIAL",
    SEQUEL: "SEQUEL",
} as const;

export const animeTypeLabel = {
    MOVIE: "Movie",
    TV: "TV",
    OVA: "Ova",
    SPECIAL: "Special",
    SEQUEL: "Sequel",
}

export const animeStatusOptions = {
    UPCOMING: "UPCOMING",
    ONGOING: "ONGOING",
    COMPLETED: "COMPLETED",
    CANCELLED: "CANCELLED",
    HIATUS: "HIATUS",
} as const;

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
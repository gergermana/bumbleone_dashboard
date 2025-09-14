import { z } from "zod/v3";

import {
    requiredString, optionalString,
    optionalIntegerNumber,
    requiredEnum, 
    requiredUrl,
    optionalStringArray,
    requiredNumberArray,
} from "@/lib/schema-helper";

import { ANIME_TYPES, ANIME_STATUS } from "../config/animeConstants";

export const AnimeSchema = z.object({
    id: z.number().readonly(),
    anilistId: optionalIntegerNumber('AnilistID'),
    franchiseKey: optionalString(),
    franchiseOrder: optionalIntegerNumber('FranchiseOrder'),
    titleEnglish: requiredString('TitleEnglish'),
    slug: requiredString('Slug'),
    titleJapanese: optionalString(),
    titleAlternative: optionalStringArray('TitleAlternative'),
    aired: optionalString(),
    premiered: optionalString(),
    animeType: requiredEnum(ANIME_TYPES, 'AnimeType'),
    animeStatus: requiredEnum(ANIME_STATUS, 'AnimeStatus'),
    coverImg: requiredUrl('CoverImg'),
    bannerImg: requiredUrl('BannerImg'),
    overview: optionalString(),
    genres: requiredNumberArray('Genre'),
    studios: requiredNumberArray('Studio'),
    createdAt: z.string().readonly(),
    updatedAt: z.string().readonly(),
});
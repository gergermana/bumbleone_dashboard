import { z } from "zod/v3";

import {
    requiredString, optionalString,
    optionalIntegerNumber,
    requiredEnum, 
    requiredUrl,
    optionalStringArray,
    requiredNumberArray,
} from "@/lib/schema-helper";

import { animeTypeOptions, animeStatusOptions } from "../config/constants";

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
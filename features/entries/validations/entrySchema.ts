import { z } from "zod";
import { ENTRY_TYPES, ENTRY_STATUS } from "../config/entryConstants";

export const EntrySchema = z.object({
    id: z.number().int(),
    franchiseId: z.number().int(),
    sortOrder: z.number().int().optional().nullable(),
    slug: z.string().max(255),
    englishTitle: z.string().max(255),
    romajiTitle: z.string().max(255).optional().nullable(),
    japaneseTitle: z.string().max(255).optional().nullable(),
    synonyms: z.string().max(255).optional().nullable(),
    aired: z.string().max(50).optional().nullable(),
    premiered: z.string().max(50).optional().nullable(),
    duration: z.number().int().optional().nullable(),
    status: z.enum(ENTRY_STATUS).optional(),
    type: z.enum(ENTRY_TYPES).optional(),
    description: z.string().optional().nullable(),
    malScore: z.number().optional().nullable(),
    anilistScore: z.number().optional().nullable(),
    posterUrl: z.string().max(500),
    bannerUrl: z.string().max(500).optional().nullable(),
    createdAt: z.coerce.date().optional(),
    genres: z.array(z.number()).optional(),
    studios: z.array(z.number()).optional(),
});

export type EntryType = z.infer<typeof EntrySchema>;
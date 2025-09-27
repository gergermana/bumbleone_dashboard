import { z } from "zod";

export const franchiseCreateSchema = z.object({
    title: z.string(),
    originalTitle: z.string(),
    slug: z.string(),
    startYear: z.number().int(),
    endYear: z.number().int(),
});

export type FranchiseCreateType = z.infer<typeof franchiseCreateSchema>;


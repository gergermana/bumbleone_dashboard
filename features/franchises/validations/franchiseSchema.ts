import { z } from "zod";
import { franchiseCreateSchema } from "./franchiseCreateSchema";

export const franchiseSchema = franchiseCreateSchema.extend({
    id: z.number().int(),
    _count: z.object({
        entries: z.number().int(),
    }),
});

export type FranchiseType = z.infer<typeof franchiseSchema>;
import { z } from "zod/v3";

export const GenreSchema = z.object({
    id: z.number(),
    name: z.string(),
    createdAt: z.string(),
});
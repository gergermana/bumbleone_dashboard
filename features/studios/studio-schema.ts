import { z } from "zod/v3";

export const StudioSchema = z.object({
    id: z.number(),
    name: z.string(),
    createdAt: z.string(),
});
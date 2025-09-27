import { z } from "zod";
import { franchiseCreateSchema } from "./franchiseCreateSchema";

export const franchiseUpdateSchema = franchiseCreateSchema.partial();
export type FranchiseUpdateType = z.infer<typeof franchiseUpdateSchema>;
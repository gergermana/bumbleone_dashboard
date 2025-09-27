import { useQuery } from "@tanstack/react-query";
import { entryQueryOptionsClient } from "../api/entryQueries";
import { useProfile } from "@/hooks/useProfile";

export const useEntry = (filters?: any, options?: { enabled?: boolean, }) => {
    return useQuery({
        ...entryQueryOptionsClient.all(filters),
        enabled: options?.enabled ?? true,
    });
}

export const useEntryDetail = (id: string, options?: { enabled?: boolean }) => {
    return useQuery({
        ...entryQueryOptionsClient.detail(id),
        enabled: options?.enabled ?? true,
    });
}
import { useQuery } from "@tanstack/react-query"
import { franchiseQueryOptionsClient } from "../api/franchiseQueries"

export const useFranchise = (filters?: any, options?: { enabled?: boolean }) => {
    return useQuery({
        ...franchiseQueryOptionsClient.all(filters),
        enabled: options?.enabled ?? true,
        retry: 3,
    });
}

export const useFranchiseDetail = (id: string, options?: { enabled?: boolean }) => {
    return useQuery({
        ...franchiseQueryOptionsClient.detail(id),
        enabled: options?.enabled ?? true,
        retry: 3,
    });
}

export const useFranchiseEntries = (id: string, filters?: any, options?: { enabled?: boolean }) => {
    return useQuery({
        ...franchiseQueryOptionsClient.entries(id, filters),
        enabled: options?.enabled ?? true,
        retry: 3,
    });
}
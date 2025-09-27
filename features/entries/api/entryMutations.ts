import { useMutation, useQueryClient } from "@tanstack/react-query"
import { entryApiClient } from "./entryApi";
import { entryQueryKeys } from "./entryQueries";

export const useCreateEntryMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: any) => entryApiClient.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: entryQueryKeys.lists() });
        },
    });
}

export const useUpdateEntryMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string, data: any }) => entryApiClient.update(id, data),
        onSuccess: (updatedEntry, { id }) => {
            queryClient.setQueryData(entryQueryKeys.detail(id), updatedEntry);
            queryClient.invalidateQueries({ queryKey: entryQueryKeys.lists() });
        },
    });
}

export const useDeleteEntryMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => entryApiClient.delete(id),
        onSuccess: (id) => {
            queryClient.removeQueries({ queryKey: entryQueryKeys.detail(id) });
            queryClient.invalidateQueries({ queryKey: entryQueryKeys.lists() });
        },
    });
}
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { animeApiClient } from "./animeApi";
import { animeQueryKeys } from "./animeQueries";

export const useCreateAnimeMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: any) => animeApiClient.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: animeQueryKeys.lists() });
        },
    });
}

export const useUpdateAnimeMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string, data: any }) => animeApiClient.update(id, data),
        onSuccess: (updatedAnime, { id }) => {
            queryClient.setQueryData(animeQueryKeys.detail(id), updatedAnime);
            queryClient.invalidateQueries({ queryKey: animeQueryKeys.lists() });
        },
    });
}

export const useDeleteAnimeMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => animeApiClient.delete(id),
        onSuccess: (id) => {
            queryClient.removeQueries({ queryKey: animeQueryKeys.detail(id) });
            queryClient.invalidateQueries({ queryKey: animeQueryKeys.lists() });
        },
    });
}
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { animeApi } from "./animeApi";
import { animeQueryKeys } from "./animeQueries";

export const useCreateAnimeMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: any) => animeApi.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: animeQueryKeys.lists() });
        },
    });
}

export const useUpdateAnimeMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string, data: any }) => animeApi.update(id, data),
        onSuccess: (updatedAnime, { id }) => {
            queryClient.setQueryData(animeQueryKeys.detail(id), updatedAnime);
            queryClient.invalidateQueries({ queryKey: animeQueryKeys.lists() });
        },
    });
}

export const useDeleteAnimeMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => animeApi.delete(id),
        onSuccess: (id) => {
            queryClient.removeQueries({ queryKey: animeQueryKeys.detail(id) });
            queryClient.invalidateQueries({ queryKey: animeQueryKeys.lists() });
        },
    });
}
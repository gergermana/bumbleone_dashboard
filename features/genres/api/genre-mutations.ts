import { useMutation, useQueryClient } from "@tanstack/react-query"
import { genreApi } from "./genre-api";
import { genreQueryKeys } from "./genre-queries";

export const useCreateGenreMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: any) => genreApi.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: genreQueryKeys.lists() });
        },
    });
}

export const useUpdateGenreMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string, data: any }) => genreApi.update(id, data),
        onSuccess: (updatedGenre, { id }) => {
            queryClient.setQueryData(genreQueryKeys.detail(id), updatedGenre);
            queryClient.invalidateQueries({ queryKey: genreQueryKeys.lists() });
        },
    });
}

export const useDeleteGenreMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => genreApi.delete(id),
        onSuccess: (id) => {
            queryClient.removeQueries({ queryKey: genreQueryKeys.detail(id) })
            queryClient.invalidateQueries({ queryKey: genreQueryKeys.lists() });
        },
    });
}
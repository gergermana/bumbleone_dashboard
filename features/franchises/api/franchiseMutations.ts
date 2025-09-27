import { useMutation, useQueryClient } from "@tanstack/react-query"
import { franchiseApiClient } from "./franchiseApi";
import { franchiseQueryKeys } from "./franchiseQueries";

import { FranchiseCreateType } from "../validations/franchiseCreateSchema";
import { FranchiseUpdateType } from "../validations/franchiseUpdateSchema";

export const useCreateFranchiseMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: FranchiseCreateType) => franchiseApiClient.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: franchiseQueryKeys.lists() });
        },
    });
}

export const useUpdateFranchiseMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string, data: FranchiseUpdateType }) => franchiseApiClient.update(id, data),
        onSuccess: (updatedEntry, { id }) => {
            queryClient.setQueryData(franchiseQueryKeys.detail(id), updatedEntry);
            queryClient.invalidateQueries({ queryKey: franchiseQueryKeys.lists() });
        },
    });
}

export const useDeleteFranchiseMutation = () => {
    const queryClient = useQueryClient();

    // return useMutation({
    //     mutationFn: (id: string) => franchiseApiClient.delete(id),
    //     onSuccess: (id) => {
    //         queryClient.removeQueries({ queryKey: franchiseQueryKeys.detail(id) });
    //         queryClient.invalidateQueries({ queryKey: franchiseQueryKeys.lists() });
    //     },
    // });
}
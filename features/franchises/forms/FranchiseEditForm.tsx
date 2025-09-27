"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { getFranchiseUpdateForm } from "../hooks/getFranchiseForm";
import { useUpdateFranchiseMutation } from "../api/franchiseMutations";

import { franchiseUpdateSchema, FranchiseUpdateType } from "../validations/franchiseUpdateSchema";

import { Form } from "@/components/core";
import { toast } from "sonner";
import { FranchiseType } from "../validations/franchiseSchema";

export function FranchiseEditForm({
    data,
}: {
    data: FranchiseType | null,
}) {
    const formInputs = getFranchiseUpdateForm();
    const form = useForm<FranchiseUpdateType>({
        resolver: zodResolver(franchiseUpdateSchema),
        defaultValues: data ?? {},
    });

    useEffect(() => {
        if (data) {
            form.reset(data);
        }
    }, [data])

    const { mutate, isPending } = useUpdateFranchiseMutation();

    const onSubmit = (data: FranchiseUpdateType) => {
        console.log(typeof data);
        // mutate({ id: data.id.toString(), data });
        toast.success('Action completed successfully!', {
            style: {
                '--normal-bg':
                'color-mix(in oklab, light-dark(var(--color-green-600), var(--color-green-400)) 10%, var(--background))',
                '--normal-text': 'light-dark(var(--color-green-600), var(--color-green-400))',
                '--normal-border': 'light-dark(var(--color-green-600), var(--color-green-400))'
            } as React.CSSProperties
        })
    }

    return (
        <Form<FranchiseUpdateType>
            form={form} 
            formInputs={formInputs}
            isPending={isPending}
            onSubmit={onSubmit}
        />
    );
}
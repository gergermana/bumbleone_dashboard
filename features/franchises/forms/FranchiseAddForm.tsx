"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { getFranchiseCreateForm } from "../hooks/getFranchiseForm";
import { useCreateFranchiseMutation } from "../api/franchiseMutations";

import { franchiseCreateSchema, FranchiseCreateType } from "../validations/franchiseCreateSchema";

import { Form } from "@/components/core";
import { toast } from "sonner";

export function FranchiseAddForm() {
    const formInputs = getFranchiseCreateForm();
    const form = useForm<FranchiseCreateType>({
        resolver: zodResolver(franchiseCreateSchema),
        defaultValues: {},
    });

    const { mutate, isPending } = useCreateFranchiseMutation();

    const onSubmit = (data: FranchiseCreateType) => {
        console.log(data);
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
        <Form<FranchiseCreateType>
            form={form} 
            formInputs={formInputs}
            isPending={isPending}
            onSubmit={onSubmit}
        />
    );
}
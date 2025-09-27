"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { getFranchiseForm } from "../hooks/getFranchiseForm";

import { Form } from "@/components/core";
import { franchiseSchema, FranchiseType } from "../validations/franchiseSchema";

export function FranchiseViewForm({
    data,
}: {
    data: FranchiseType | null,
}) {
    const formInputs = getFranchiseForm();
    const form = useForm<FranchiseType>({
        resolver: zodResolver(franchiseSchema),
        defaultValues: data ?? {},
    });

    useEffect(() => {
        if (data) {
            form.reset(data);
        }
    }, [data])

    return (
        <Form<FranchiseType>
            type="view"
            form={form} 
            formInputs={formInputs}
        />
    );
}
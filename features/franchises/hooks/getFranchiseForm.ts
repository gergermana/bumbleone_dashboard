import { FormInputsType } from "@/components/core/Form";

import { FranchiseType } from "../validations/franchiseSchema";
import { FranchiseCreateType } from "../validations/franchiseCreateSchema";
import { FranchiseUpdateType } from "../validations/franchiseUpdateSchema";

export function getFranchiseForm(): FormInputsType<FranchiseType>[] {
    const franchiseForm: FormInputsType<FranchiseType>[] = [
        { key: "id", label: "ID", type: "readonly" },
        { key: "title", label: "Title", type: "readonly" },
        { key: "originalTitle", label: "Original Title", type: "readonly" },
        { key: "slug", label: "Slug", type: "readonly" },
        { key: "startYear", label: "Start Year", type: "readonly" },
        { key: "endYear", label: "End Year", type: "readonly" },
    ];
    return franchiseForm; 
}

export function getFranchiseCreateForm(): FormInputsType<FranchiseCreateType>[] {
    const franchiseForm: FormInputsType<FranchiseCreateType>[] = [
        { key: "title", label: "Title", type: "text" },
        { key: "originalTitle", label: "Original Title", type: "text" },
        { key: "slug", label: "Slug", type: "text" },
        { key: "startYear", label: "Start Year", type: "number" },
        { key: "endYear", label: "End Year", type: "number" },
    ];
    return franchiseForm; 
}

export function getFranchiseUpdateForm(): FormInputsType<FranchiseUpdateType>[] {
    const franchiseForm: FormInputsType<FranchiseUpdateType>[] = [
        { key: "title", label: "Title", type: "text" },
        { key: "originalTitle", label: "Original Title", type: "text" },
        { key: "slug", label: "Slug", type: "text" },
        { key: "startYear", label: "Start Year", type: "number" },
        { key: "endYear", label: "End Year", type: "number" },
    ];
    return franchiseForm; 
}

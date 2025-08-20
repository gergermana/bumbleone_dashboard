import { InputType } from "@/types/input-type"
import { loginSchema } from "./login-schema"
import { z } from "zod/v3"

type LoginInputsType = {
    key: keyof z.infer<typeof loginSchema>;
    label: string;
    type: InputType;
}

export const loginInputs: LoginInputsType[] = [
    { key: "email", label: "Email", type: "email" },
    { key: "password", label: "Password", type: "password" },
]
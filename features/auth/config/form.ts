import { InputType } from "@/types/input-type"
import { loginSchema } from "../validations/schema";
import { z } from "zod/v3"

type LoginFormType = {
    key: keyof z.infer<typeof loginSchema>;
    label: string;
    type: InputType;
}

export const loginForm: LoginFormType[] = [
    { key: "email", label: "Email", type: "email" },
    { key: "password", label: "Password", type: "password" },
]
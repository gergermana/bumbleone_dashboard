"use client";

import { useRouter } from "next/navigation";
import { z } from "zod/v3";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Logo } from "@/components/Logo";

import { useLogin } from "@/features/login/login-api-hook";

import { loginSchema } from "@/features/login/login-schema";
import { loginInputs } from "@/features/login/login-inputs";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { inputRenderer } from "@/hooks/input-renderer";

const Login02Page = () => {
    const router = useRouter();
    const form = useForm<z.infer<typeof loginSchema>>({
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: zodResolver(loginSchema),
    });

    const { mutate } = useLogin();

    const onSubmit = (data: z.infer<typeof loginSchema>) => {
        console.log(data);
        if (data) {
            mutate(data, {
                onSuccess: (token, _) => {
                    router.replace("/");
                }
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-sm w-full flex flex-col items-center border rounded-lg p-6 shadow-sm">
                <Logo className="w-60 text-foreground"/>

                <div className="py-2 w-full flex items-center justify-center overflow-hidden">
                    <Separator />
                    <span className="text-sm px-2 font-semibold text-nowrap">Admin Dashboard</span>
                    <Separator />
                </div>

                <Form {...form}>
                    <form className="w-full space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                        {loginInputs.map(input => (
                            <FormField
                                key={input.key}
                                control={form.control}
                                name={input.key}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{input.label}</FormLabel>
                                        <FormControl>
                                            {inputRenderer[input.type](field, input.label)}
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        ))}
                        <Button type="submit" className="mt-4 w-full">
                            Login
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default Login02Page;

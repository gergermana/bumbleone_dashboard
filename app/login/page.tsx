"use client";

import { useRouter } from "next/navigation";
import { z } from "zod/v3";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Logo } from "@/components/icons/Logo";

import { loginSchema } from "@/features/auth/validations/schema";
import { loginForm } from "@/features/auth/config/form";

import { inputRenderer } from "@/hooks/input-renderer";

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
import { useAuth } from "@/features/auth/hooks/use-auth";
import { Loader } from "lucide-react";

const Login02Page = () => {
    const form = useForm<z.infer<typeof loginSchema>>({
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: zodResolver(loginSchema),
    });

    const { login, isLoggingIn, loginError } = useAuth();
    const router = useRouter();

    const onSubmit = async (data: z.infer<typeof loginSchema>) => {
        try {
            await login(data);
            router.push('/dashboard');
        } catch (error) {
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
                        {loginForm.map(input => (
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
                        <Button type="submit" className="mt-4 w-full" disabled={isLoggingIn}>
                            {isLoggingIn && <Loader className="animate-spin"/>}
                            Login
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default Login02Page;

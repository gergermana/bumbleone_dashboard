"use client";

import { useRouter } from "nextjs-toploader/app";
import { z } from "zod/v3";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Logo, PlanetWithRing } from "@/components/icons/Logo";

import { loginSchema } from "@/features/auth/validations/authSchema";
import { loginForm } from "@/features/auth/config/form";

import { inputRenderer } from "@/hooks/inputRenderer";

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
import { useLogin } from "@/features/auth/hooks/useAuthMutations";

const Login02Page = () => {
    const form = useForm<z.infer<typeof loginSchema>>({
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: zodResolver(loginSchema),
    });

    const { mutateAsync: loginMutate, isPending: loginPending } = useLogin();
    const router = useRouter();

    const onSubmit = async (data: z.infer<typeof loginSchema>) => {
        try {
            await loginMutate(data);
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
                        <Button type="submit" className="mt-4 w-full" disabled={loginPending}>
                            {loginPending && <PlanetWithRing className="animate-spin size-5"/>}
                            Login
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default Login02Page;

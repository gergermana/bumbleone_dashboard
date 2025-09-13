'use client';

import { Skeleton } from "./ui/skeleton";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { cn } from "@/lib/utils";
import { User } from "@/store/slices/authSlice";

export default function CardProfile({ 
    user, 
    className,
    isLoading = false,
    endContent,
}: { 
    user: User | null, 
    className?: {
        mainWrapper?: string,
        avatar?: string,
        contentsWrapper?: string,
        username?: string,
        email?: string,
    },
    isLoading?: boolean,
    endContent?: React.ReactNode,
}) {

    if (isLoading) {
        return (
            <div className="flex gap-3 items-center w-full h-full">
                <Skeleton className={cn("w-8 h-8 rounded-lg", className?.avatar)}/>
                <div className="grid flex-1 text-left text-sm w-full h-full gap-2 py-1">
                    <Skeleton className="w-3/5 h-full rounded-sm"/>
                    <Skeleton className="w-5/5 h-full rounded-sm"/>
                </div>
            </div>
        );
    }

    return (
        <div className={cn("flex items-center gap-2 text-left text-sm w-full", className?.mainWrapper)}>
            <Avatar className={cn("w-8 h-8 rounded-lg", className?.avatar)}>
                <AvatarImage src={user?.avatarUrl} alt={user?.username} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
            </Avatar>
            <div className={cn("grid flex-1 text-left text-sm leading-tight", className?.contentsWrapper)}>
                <span className={cn("truncate font-medium", className?.username)}>{user?.username}</span>
                <span className={cn("truncate text-xs", className?.email)}>{user?.email}</span>
            </div>
            {endContent && <div>{endContent}</div>}
        </div>
    );
}
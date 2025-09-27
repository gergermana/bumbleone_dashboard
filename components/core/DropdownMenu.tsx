import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { type LucideIcon } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

export type ActionsDataType = {
    actionPrimary: {
        title: string,
        url?: string,
        icon?: LucideIcon,
        onClick?: () => void,
    }[];
    actionSecondary?: {
        title: string,
        url?: string,
        icon?: LucideIcon,
        onClick?: () => void,
    }[];
    // actionPrimary: Array<{
    //     title: string,
    //     url?: string,
    //     icon?: LucideIcon, 
    //     onClick?: () => void,
    // }>;
    // actionSecondary?: Array<{
    //     title: string,
    //     url?: string,
    //     icon?: LucideIcon,
    //     onClick?: () => void,
    // }>;
}

export default function MyDropdownMenu({ 
    label,
    icon: Icon,
    actionsData,
}: {
    label?: string,
    icon?: LucideIcon | any,
    actionsData: ActionsDataType,
}) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="data-[state=open]:bg-muted text-muted-foreground flex size-8 p-0"
                    size="icon"
                >
                    {Icon && <Icon className="size-5"/>}
                    <span className="sr-only">{label ?? "Open Menu"}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {actionsData?.actionPrimary.map(item => 
                    item.url ? (
                        <DropdownMenuItem key={item.title} asChild>
                            <Link href={item.url}>
                                {item.icon && <item.icon className="size-5"/>}
                                {item.title}
                            </Link>
                        </DropdownMenuItem>
                    ) : (
                        <DropdownMenuItem key={item.title} onClick={item?.onClick}>
                            {item.icon && <item.icon className="size-5"/>}
                            {item.title}
                        </DropdownMenuItem>
                    )
                )}

                {actionsData?.actionSecondary && <DropdownMenuSeparator/>}

                {actionsData?.actionSecondary?.map(item =>
                    <DropdownMenuItem variant="destructive" key={item.title}>
                        {item.icon && <item.icon className="size-5"/>}
                        {item.title}
                    </DropdownMenuItem>
                )}
                
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
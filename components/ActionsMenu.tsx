import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator,  } from "@/components/ui/dropdown-menu";
import { EllipsisVertical, type LucideIcon } from "lucide-react";
import { Button } from "./ui/button";

export function ActionDropdown({ 
    actionsData 
}: {
    actionsData: {
        actionMain: Array<{
            title: string,
            url?: string,
            icon?: LucideIcon, 
            onClick?: () => void,
        }>;
        actionSecondary?: Array<{
            title: string,
            url?: string,
            icon?: LucideIcon,
            onClick?: () => void,
        }>;
    },
}) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
                    size="icon"
                >
                    <EllipsisVertical className="size-5"/>
                    <span className="sr-only">Open menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {actionsData?.actionMain.map(item => 
                    <DropdownMenuItem key={item.title} onClick={item?.onClick}>
                        {item.icon && <item.icon className="size-5"/>}
                        {item.title}
                    </DropdownMenuItem>
                )}

                <DropdownMenuSeparator />

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
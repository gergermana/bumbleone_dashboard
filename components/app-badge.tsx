import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";

export default function MyBadge({
    variant = "default",
    className,
    content,
    icon = false,
}: {
    variant?: "outline" | "default",
    className?: {
        mainWrapper?: string,
        dot?: string,
        content?: string,
    },
    content: string,
    icon?: boolean,
}) {
    return (
        <Badge variant={variant} className={cn("py-1 w-full flex items-center gap-2", className?.mainWrapper)}>
            {icon && <div className={cn("size-2 rounded-full bg-muted-foreground mr-auto", className?.dot)}/>}
            {icon && <span className="text-muted-foreground mr-auto">{content}</span>}

            {!icon && <span className={cn("text-muted-foreground", className?.content)}>{content}</span>}
        </Badge>
    );
}
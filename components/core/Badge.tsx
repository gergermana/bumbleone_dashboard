import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";

export default function MyBadge({
    variant = "default",
    className,
    content,
    icon = "default",
}: {
    variant?: "outline" | "default",
    className?: {
        mainWrapper?: string,
        dot?: string,
        content?: string,
    },
    content: string,
    icon?: "default" | "dot",
}) {
    return (
        <Badge variant={variant} className={cn("py-1 w-full flex items-center gap-2", className?.mainWrapper)}>
            {icon === "dot" && <div className={cn("size-2 rounded-full bg-muted-foreground mr-auto", className?.dot)}/>}

            {icon !== "default" && <span className="text-muted-foreground mr-auto">{content}</span>}

            {icon === "default" && <span className={cn("text-muted-foreground", className?.content)}>{content}</span>}
        </Badge>
    );
}
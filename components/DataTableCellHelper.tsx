import { EllipsisVertical } from "lucide-react";
import { Badge, DropdownMenu } from "./core";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { ActionsDataType } from "./core/DropdownMenu";

export function HeaderCheckbox({ table }: { table: any }) {
    return (
        <div 
            className="flex items-center justify-center h-full w-10 cursor-pointer"
            onClick={() => 
                table.toggleAllPageRowsSelected(
                    !table.getIsAllPageRowsSelected()
                )
            }
        >
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
                className="cursor-pointer"
            />
        </div>
    );
}

export function CellCheckbox({ row }: { row: any }) {
    return (
        <div 
            className="flex items-center justify-center h-full w-10 cursor-pointer"
            onClick={() => 
                row.toggleSelected(
                    !row.getIsSelected()
                )
            }
        >
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="cursor-pointer"
            />
        </div>
    );
}

export function CellViewer({ value, onClick }: { value?: string | number, onClick?: () => void }) {
    return (
        <Button 
            variant="link" 
            className="p-0 text-foreground h-full min-w-[180px] text-start line-clamp-3 break-all whitespace-normal" 
            onClick={onClick}
            disabled={!value}
        >
            {value ?? "-"}
        </Button>
    );
}

export function CellPrimary({ value }: { value?: string | number }) {
    return (
        <div className="flex items-center">
            {value ?? "-"}
        </div>
    );
}

export function CellSecondary({ value }: { value?: string | number }) {
    return (
        <div className="text-muted-foreground min-w-[180px] line-clamp-3 break-all whitespace-normal">
            {value ?? "-"}
        </div>
    );
}

export function CellBadge({ icon = "default", value, color }: { icon?: "default" | "dot", value: string | number, color: string }) {
    return (
        <Badge 
            variant="outline"
            icon={icon}
            content={value.toString()} 
            className={icon === 'dot' ? { dot: color } : { content: color }}
        />
    );
}

export function CellActionsMenu({ actions }: { actions: ActionsDataType }) {
    return (
        <div className="flex items-center">
            <DropdownMenu
                icon={EllipsisVertical}
                actionsData={actions}
            />
        </div>
    );
}
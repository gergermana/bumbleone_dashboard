// 'use client';

import { usePathname } from "next/navigation";

import { 
    Breadcrumb, 
    BreadcrumbList, 
    BreadcrumbItem, 
    BreadcrumbLink, 
    BreadcrumbSeparator, 
    BreadcrumbPage, 
    BreadcrumbEllipsis 
} from "./ui/breadcrumb";
import { DropdownMenu } from "./core";

export default function BreadCrumb() {
    const pathName = usePathname();
    const parts = pathName.split('/').filter(Boolean);
    // const parts = ['dashboard', 'franchise', 'slug', 'entries', 'wahaha', 'wuhwahwa'];

    if (parts.length <= 3) {
        return (
            <Breadcrumb>
                <BreadcrumbList className="hidden lg:flex">
                    {parts.map((part, index) => (
                        <div className="contents" key={part}>
                            <BreadcrumbItem>
                                {index === parts.length - 1 ? (
                                    <BreadcrumbPage className="capitalize">{part}</BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink
                                        href={`/${parts.slice(0, index + 1).join("/")}`}
                                        className="capitalize"
                                    >
                                        {part}
                                    </BreadcrumbLink>
                                )}
                            </BreadcrumbItem>
                            {index < parts.length - 1 && <BreadcrumbSeparator />}
                        </div>
                    ))}
                </BreadcrumbList>
            </Breadcrumb>
        )
    }
        
    const firstPart = parts[0];
    const ellipsisParts = parts.slice(1, -2);
    const finalParts = parts.slice(-2);

    return (
        <Breadcrumb>
            <BreadcrumbList className="hidden lg:flex">
                <BreadcrumbItem>
                    <BreadcrumbLink href={`/${firstPart}`} className="capitalize">
                        {firstPart}
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator/>
                <BreadcrumbItem>
                    <DropdownMenu 
                        label="breadcrumb_menu"
                        icon={BreadcrumbEllipsis}
                        actionsData={{
                            actionMain: ellipsisParts.map((part, index) => ({ 
                                title: part, 
                                url: `/${parts.slice(0, index + 2).join("/")}`
                            }))
                        }}
                    />
                </BreadcrumbItem>
                <BreadcrumbSeparator/>
                {finalParts.map((part, index) => 
                    <div className="contents" key={part}>
                        <BreadcrumbItem>
                            {index === finalParts.length - 1 ? (
                                <BreadcrumbPage className="capitalize">
                                    {part}
                                </BreadcrumbPage>
                            ) : (
                                <BreadcrumbLink 
                                    href={`/${parts.slice(0, (ellipsisParts.length - 1) + index + 3).join("/")}`} 
                                    className="capitalize"
                                >
                                    {part}
                                </BreadcrumbLink>
                            )}
                        </BreadcrumbItem>
                        {index < finalParts.length - 1 && <BreadcrumbSeparator/>}
                    </div>
                )}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
"use client";

import { Search } from "lucide-react";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";

interface AppSearchProps {
    search: string;
    onSearchChange: (newSearch: string) => void;
}

export function AppSearch({ search, onSearchChange }: AppSearchProps) {
    const [inputValue, setInputValue] = useState(search);

    const handleSubmit = () => {
        onSearchChange(inputValue);
    }

    return (
        <div className="flex items-center gap-2 w-full">
            <Input className="max-w-[400px]" value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
            <Button variant="outline" size="sm" onClick={handleSubmit}>
                <Search/>
                <span className="hidden xl:inline">Search</span>
            </Button>
        </div>
        
    );
}
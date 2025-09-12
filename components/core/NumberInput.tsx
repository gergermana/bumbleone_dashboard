"use client";

import React, { forwardRef, useState } from "react";
import { useInterval } from "@/hooks/useInterval";

import { ChevronUp, ChevronDown } from "lucide-react";

import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface NumberInputProps {
    value?: number | null;
    onChange?: (value: number | null) => void;
    onBlur?: () => void;
    step?: number;
    min?: number;
    max?: number;
}

const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
    ({ value, onChange, onBlur, step = 1, min = -Infinity, max = Infinity, ...props }, ref) => {
        const [mouseDownDirection, setMouseDownDirection] = useState<'up' | 'down' | null>(null);

        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const val = e.target.value;
            if (val === "" || val === null || val === undefined) {
                onChange?.(null);
            } else {
                onChange?.(Number(val));
            }
        }

        const handleIncrement = () => {
            if (typeof value === 'string' || value === null) return onChange?.(0);
            let next = value ? value + step : 0 + step;
            if (max !== undefined) next = Math.min(next, max);
            onChange?.(parseFloat(next.toFixed(2)));
        };

        const handleDecrement = () => {
            if (typeof value === 'string' || value === null) return onChange?.(0);
            let next = value ? value - step : 0 - step;
            if (min !== undefined) next = Math.max(next, min);
            onChange?.(parseFloat(next.toFixed(2)));
        }

        const handleButtonChange = (direction: 'up' | 'down' | null) => {
            switch (direction) {
                case "up":
                    handleIncrement();
                    break;
                case "down":
                    handleDecrement();
                    break;
                default:
                    break;
            }
        }

        useInterval(() => handleButtonChange(mouseDownDirection), mouseDownDirection ? 100 : null);

        return(
            <div className="flex h-9 rounded-lg">
                <Input 
                    type="number"
                    value={value ?? ""}
                    onChange={handleInputChange}
                    onBlur={onBlur}
                    ref={ref}
                    step={step}
                    className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none rounded-r-none relative"
                    {...props}
                />
                <div className="grid grid-rows-2 h-9 rounded-r-lg border border-input border-l-0 bg-input/30">
                    <Button 
                        type="button" 
                        variant="ghost"
                        onClick={() => handleButtonChange("up")}
                        onMouseDown={() => setMouseDownDirection("up")}
                        onMouseOut={() => setMouseDownDirection(null)}
                        onMouseUp={() => setMouseDownDirection(null)}
                        className="px-2 h-full rounded-l-none rounded-br-none text-muted-foreground hover:text-primary"
                    >
                        <ChevronUp/>
                    </Button>
                    <Button 
                        type="button" 
                        variant="ghost"
                        onClick={() => handleButtonChange("down")}
                        onMouseDown={() => setMouseDownDirection("down")}
                        onMouseOut={() => setMouseDownDirection(null)}
                        onMouseUp={() => setMouseDownDirection(null)}
                        className="px-2 h-full rounded-l-none rounded-tr-none text-muted-foreground hover:text-primary"
                    >
                        <ChevronDown/>
                    </Button>
                </div>
                
            </div>
        );
    }
)

export default NumberInput;
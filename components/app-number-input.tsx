
import { ChevronDown, ChevronUp } from 'lucide-react';
import { ChangeEvent, forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { NumericFormat, NumericFormatProps } from 'react-number-format';
import { Button } from './ui/button';
import { Input } from './ui/input';

import { useInterval } from '@/hooks/use-interval';

export interface NumberInputProps
  extends Omit<NumericFormatProps, 'value' | 'onValueChange'> {
  stepper?: number;
  thousandSeparator?: string;
  placeholder?: string;
  defaultValue?: number;
  min?: number;
  max?: number;
  value?: number; // Controlled value
  suffix?: string;
  prefix?: string;
  onValueChange?: (value: number | undefined) => void;
  fixedDecimalScale?: boolean;
  decimalScale?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
}

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
(
    {
        stepper,
        thousandSeparator,
        placeholder,
        defaultValue,
        min = -Infinity,
        max = Infinity,
        onValueChange,
        fixedDecimalScale = false,
        decimalScale = 0,
        suffix,
        prefix,
        value: controlledValue,
        ...props
    },
    ref
) => {
    const [value, setValue] = useState<number | undefined>(controlledValue ?? defaultValue);
    const [mouseDownDirection, setMouseDownDirection] = useState<'up' | 'down' | null>(null);
    const maxNum = (num: number) => (num < 0 ? max : max);

    useInterval(() => handleButtonChange(mouseDownDirection), mouseDownDirection ? 100 : null);

    useEffect(() => {
        if (controlledValue !== undefined) {
            setValue(controlledValue);
        }
    }, [controlledValue]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.currentTarget;
        setValue(curr => {
            if (!Boolean(value)) return 0;
            const numeric = parseInt(value, 10);
            const maxLength = maxNum(numeric);

            if (value.length > maxLength) {
                return curr;
            }

            return (value.length <= maxLength ? numeric : curr);
        });
    };

    const handleBlur = () => {
        if (value !== undefined) {
            if (value < min) {
                setValue(min);
                if (ref && 'current' in ref && ref.current) ref.current.value = String(min);
            } else if (value > max) {
                setValue(max);
                if (ref && 'current' in ref && ref.current) ref.current.value = String(max);
            }
        }

        if (props.onBlur) props.onBlur();
    };

    const handleButtonChange = (direction?: 'up' | 'down' | null) => {
        setValue(curr => {
            if (curr === undefined) return;
            let next: number;

            switch (direction) {
                case "up":
                    next = curr + (stepper || 1);
                    break;
                case "down":
                    next = curr - (stepper || 1);
                    break;
                default:
                    next = curr;
                    break;
            }

            return `${next}`.length <= maxNum(curr) ? next : curr;
        });
    };

    return (
      <div className="flex items-center border-input border-2 rounded-md">
        <NumericFormat
            value={value}
            onChange={handleChange}
            thousandSeparator={thousandSeparator}
            decimalScale={decimalScale}
            fixedDecimalScale={fixedDecimalScale}
            allowNegative={min < 0}
            valueIsNumericString
            onBlur={handleBlur}
            max={max}
            min={min}
            suffix={suffix}
            prefix={prefix}
            customInput={Input}
            placeholder={placeholder}
            className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none rounded-r-none border-none relative"
            getInputRef={ref}
            {...props}
        />

        <div className="grid grid-rows-2 bg-input/30 h-10">
            <Button
                aria-label="Increase value"
                type="button"
                className="px-2 h-full rounded-l-none focus-visible:relative cursor-pointer"
                variant="ghost"
                onClick={() => handleButtonChange("up")}
                onMouseDown={() => setMouseDownDirection("up")}
                onMouseOut={() => setMouseDownDirection(null)}
                onMouseUp={() => setMouseDownDirection(null)}
                disabled={value === max}
            >
                <ChevronUp size={15} className='text-muted-foreground'/>
            </Button>
            <Button
                aria-label="Decrease value"
                type='button'
                className="px-2 h-full rounded-l-none focus-visible:relative cursor-pointer"
                variant="ghost"
                onClick={() => handleButtonChange("down")}
                onMouseDown={() => setMouseDownDirection("down")}
                onMouseOut={() => setMouseDownDirection(null)}
                onMouseUp={() => setMouseDownDirection(null)}
                disabled={value === min}
            >
                <ChevronDown size={15} className='text-muted-foreground'/>
            </Button>
        </div>
      </div>
    );
  }
);

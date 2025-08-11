import { z } from "zod/v3";

// Required String
export const requiredString = (fieldName: string) =>
    z.preprocess(
        (val) => {
            if (val === null) return undefined;
            if (typeof val === "string" && val.trim() === "") return undefined;
            return val;
        },
        z.string({
            required_error: `${fieldName} is required`,
            invalid_type_error: `${fieldName} must be a string`,
        })
        .trim()
        .min(1, `${fieldName} is required`)
        .max(255, "Too long, must be at most 255 characters")
    );

// Optional String
export const optionalString = (fieldName: string) => 
    z.preprocess(
        (val) => {
            if (typeof val === "string" && val.trim() === "") return null;
            return val;
        },
        z.string({
            invalid_type_error: `${fieldName} must be a string`,
        })
        .max(255, "Too long, must be at most 255 characters")
        .optional()
        .nullable()
    );  

// Required Integer Number
export const requiredIntegerNumber = (fieldName: string) => 
    z.preprocess(
        (val) => {
            if (val === null) return undefined;
            return val;
        },
        z.number({
            required_error: `${fieldName} is required`,
            invalid_type_error: `${fieldName} must be a string`,
        })
        .min(0, `${fieldName} must be greater or equal to 0`)
    );

// Optional Integer Number
export const optionalIntegerNumber = (fieldName: string) => z
    .number({
        invalid_type_error: `${fieldName} must be an integer number`,
    })
    .int()
    .min(0, `${fieldName} must be greater or equal to 0`)
    .optional()
    .nullable();

// Required Enum
export const requiredEnum = <T extends readonly string[]>(
    enumValues: T, 
    fieldName: string
) =>
    z.preprocess(
        (val: unknown) => {
            if (val === null) return undefined;
            if (typeof val === "string" && val.trim() === "") return undefined;
            return val;
        },
        z.string({
            required_error: `${fieldName} is required`,
            invalid_type_error: `${fieldName} must be a string`,
        })
        .trim()
        .min(1, `${fieldName} is required`)
        .refine((val): val is T[number] => enumValues.includes(val), {
            message: `Invalid ${fieldName}`,
        })
    );

// Optional Enum
export const optionalEnum = <T extends readonly string[]>(
    enumValues: T, 
    fieldName: string,
) => 
    z.union([z
        .string({
            invalid_type_error: `${fieldName} must be a string`,
        })
        .refine((val): val is T[number] => enumValues.includes(val), {
            message: `Invalid ${fieldName}`,
        }),
        z.null(),
    ])
    .optional();

// Required Url
export const requiredUrl = (fieldName: string) =>
    z.string({
        required_error: `${fieldName} is required`,
        invalid_type_error: `${fieldName} must be a string`,
    })
    .trim()
    .min(1, `${fieldName} is required`)
    .url()
    .max(255, "Too long, must be at most 255 characters");

// Optional Url
export const optionalUrl = (fieldName: string) =>
    z.string({
        invalid_type_error: `${fieldName} must be a string`,
    })
    .url()
    .max(255, "Too long, must be at most 255 characters")
    .optional();

// Optional String Array
export const optionalStringArray = (fieldName: string) => z
    .array(z
        .string({
            invalid_type_error: `Each item in ${fieldName} must be a string`,
        })
        .trim()
        .min(1, `Each item must contain non-space character(s)`)
        .max(255, "Item must be at most 255 characters"),
        {
            invalid_type_error: `${fieldName} must be an array of strings`,
        }
    )   
    .optional()

// Required Number Array
export const requiredNumberArray = (fieldName: string) => z
    .array(z
        .number({
            invalid_type_error: `Each item in ${fieldName} must be an integer number`,
        })
        .int()
        .positive(),
        {
            required_error: `${fieldName} is required`,
            invalid_type_error: `${fieldName} must be an array of numbers`,
        }
    )
    .min(1, `At least one ${fieldName} is required`);

// Optional Number Array
export const optionalNumberArray = (fieldName: string) => z
    .array(z
        .number({
            invalid_type_error: `Each item in ${fieldName} must be an integer number`,
        })
        .int()
        .positive(), 
        {
            invalid_type_error: `${fieldName} must be an array of numbers`,
        }
    )
    .optional();
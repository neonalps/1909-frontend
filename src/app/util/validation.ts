import { hasText, isNotDefined } from "@src/app/util/common";

export function validateDefined(input: unknown, message: string): void {
    if (isNotDefined(input)) {
        throw new Error(`${message} must not be null or undefined`);
    }
}

export function validateHasText(input: string, message: string): void {
    if (!hasText(input)) {
        throw new Error(`${message} must not be empty`);
    }
}
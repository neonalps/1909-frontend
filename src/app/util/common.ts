export function isDefined(value: unknown): boolean {
    return value !== undefined && value !== null;
}

export function isNotDefined(value: unknown): boolean {
    return !isDefined(value);
}

export function hasText(value: string): boolean {
    return isDefined(value) && value.trim().length > 0;
}

export function convertBooleanToNumber(input: boolean): number {
    return input ? 1 : 0;
}

export function convertNumberToBoolean(input: number): boolean {
    return input === 1;
}

export function convertDateToDateTimeString(input: Date): string {
    return input.toISOString();
}

export function convertDateToDateString(input: Date): string {
    return convertDateToDateTimeString(input).substring(0, 10);
}

export function convertDateStringToDate(input: string): Date {
    return new Date(input);
}

export function timeout(delayMs: number): Promise<void> {
    return new Promise(resolve => {
        setTimeout(() => resolve(), delayMs);
    });
}
import { validateDefined } from "@src/app/util/validation";

export function serializeValue(value: unknown): string {
    validateDefined(value, "value");

    const valueType = typeof value;

    if (valueType === 'string') {
        return `s:${value}`;
    } else if (valueType === 'number') {
        return `n:${value}`;
    } else if (valueType === 'boolean') {
        return `b:${value === true ? "1" : "0"}`;
    } else if (Object.prototype.toString.call(value) === '[object Date]') {
        return `d:${(value as Date).toISOString()}`;
    } else if (value === null) {
        return '0:';
    }

    throw new Error(`Unserializable value type: ${JSON.stringify(value)}`);
}

export function deserializeValue(serializedValue: string): unknown {
    validateDefined(serializedValue, "serializedValue");

    const typeIndicator = serializedValue[0];

    if (typeIndicator === "0") {
        return null;
    }

    const item = serializedValue.slice(2);

    switch (typeIndicator) {
        case "s":
            return item;
        case "n":
            return parseFloat(item);
        case "b":
            return item === "1";
        case "d":
            return new Date(item);
        default:
            throw new Error(`Undeserializable value type: ${serializedValue}`);
    }
}
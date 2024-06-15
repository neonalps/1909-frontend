export type TypedFunction<T> = (input: string) => T;

export interface SqlConverter {
    convertToSql(input: string): string;
}
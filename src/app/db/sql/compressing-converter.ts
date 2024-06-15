import { Injectable } from "@angular/core";
import { SqlConverter, TypedFunction } from "./interpreter";
import { validateDefined } from "@src/app/util/validation";

@Injectable({
    providedIn: 'root'
})
export class CompressingSqlConverter implements SqlConverter {

    private static COMPRESSION_MAP = new Map<string, TypedFunction<string>>([
        ['create table', () => '@ct'],
        ['create index', () => '@ci'],
        ['insert into', () => '@i'],
        ['primary key', () => '@p'],
        ['set', () => '@s'],
        ['update', () => '@u'],
        ['values', () => '@v'],
    ]);

    convertToSql(input: string): string {
        validateDefined(input, "input");

        let result = input;

        for (const [keyword, compressor] of CompressingSqlConverter.COMPRESSION_MAP.entries()) {
            // standard replacement
            result = result.replaceAll(keyword, compressor("noop"));
        }

        return result;
    }


}
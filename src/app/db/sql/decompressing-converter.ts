import { Injectable } from "@angular/core";
import { SqlConverter, TypedFunction } from "@src/app/db/sql/interpreter";
import { validateDefined } from "@src/app/util/validation";

@Injectable({
    'providedIn': 'root',
})
export class DecompressingSqlConverter implements SqlConverter {

    private static DECOMPRESSION_MAP = new Map<string, TypedFunction<string>>([
        ['@b', (input: string) => atob(input)],
    ]);

    convertToSql(input: string): string {
        validateDefined(input, "input");

        let result = input;

        for (const [keyword, decompressor] of DecompressingSqlConverter.DECOMPRESSION_MAP.entries()) {
            // if the decompression function requires an argument, we have to parse it
            if (decompressor.length > 0) {
                while (result.indexOf(keyword) >= 0) {
                    const position = result.indexOf(keyword);
                    const firstDelimiter = result.indexOf(":", position);
                    const secondDelimiter = result.indexOf(":", firstDelimiter + 1);

                    const decompressorArgument = result.substring(firstDelimiter + 1, secondDelimiter);
                    const decompressorResult = decompressor(decompressorArgument);

                    const portionToReplace = result.substring(position, secondDelimiter);
                    result.replace(portionToReplace, decompressorResult);
                }
            } else {
                // standard replacement
                result = result.replaceAll(keyword, decompressor("noop"));
            }
        }

        return result;
    }

}
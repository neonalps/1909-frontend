import { SeasonDao } from "@src/app/models/dao/season.dao";
import { SeasonDaoInterface } from "@src/app/models/interface/season.interface";
import { convertDateStringToDate, convertDateToDateString } from "@src/app/util/common";

export class SeasonConverter {

    public static fromDaoInterface(from: SeasonDaoInterface): SeasonDao {
        return {
            id: from.id,
            name: from.name,
            shortName: from.short_name,
            from: convertDateStringToDate(from.from_),
            to: convertDateStringToDate(from.to_),
            tombstone: from.tombstone,
        };
    }

    public static toDaoInterface(from: SeasonDao): SeasonDaoInterface {
        return {
            id: from.id,
            name: from.name,
            short_name: from.shortName,
            from_: convertDateToDateString(from.from),
            to_: convertDateToDateString(from.to),
            tombstone: from.tombstone,
        }
    }

}
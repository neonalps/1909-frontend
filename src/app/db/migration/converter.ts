import { MigrationDao } from "@src/app/models/dao/migration.dao";
import { MigrationDaoInterface } from "@src/app/models/interface/migration.interface";

export class MigrationConverter {

    public static fromDaoInterface(from: MigrationDaoInterface): MigrationDao {
        return {
            id: from.id,
            sql: from.sql,
            errorMessage: from.error_message,
        };
    }

    public static toDaoInterface(from: MigrationDao): MigrationDaoInterface {
        return {
            id: from.id,
            sql: from.sql,
            error_message: from.errorMessage,
        }
    }

}
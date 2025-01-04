import { Repository } from "@src/app/db/repository";
import { MigrationDaoInterface } from "@src/app/models/interface/migration.interface";
import { MigrationConverter } from "@src/app/db/migration/converter";
import { MigrationDao } from "@src/app/models/dao/migration.dao";
import { Injectable } from "@angular/core";
import { isDefined } from "@src/app/util/common";

@Injectable({
    providedIn: 'root',
})
export class MigrationRepository {

    constructor(private readonly repository: Repository) {}

    async create(migration: MigrationDao): Promise<MigrationDao> {
        if (isDefined(migration.errorMessage)) {
            await this.createFailedMigration(migration);
        } else {
            await this.createSuccessfulMigration(migration);
        }

        const createdMigration = await this.getById(migration.id);
        if (createdMigration === null) {
            throw new Error("Failed to create migration");
        }

        return createdMigration;
    }

    async getAll(): Promise<MigrationDao[]> {
        const items = await this.repository.query<MigrationDaoInterface>(`select * from migration`);
        return items.map(item => MigrationConverter.fromDaoInterface(item));
    }

    async getById(migrationId: string): Promise<MigrationDao | null> {
        const item = await this.repository.queryById<MigrationDaoInterface>(`select * from migration where id = :id`, { ':id': migrationId });
        return item !== null ? MigrationConverter.fromDaoInterface(item) : null;
    }

    private async createSuccessfulMigration(migration: MigrationDao): Promise<void> {
        await this.repository.query(`insert into migration (id, sql) values (:id, :sql)`, { ':id': migration.id, ':sql': migration.sql });
    }

    private async createFailedMigration(migration: MigrationDao): Promise<void> {
        await this.repository.query(`insert into migration (id, sql, error_message) values (:id, :sql, :error)`, { ':id': migration.id, ':sql': migration.sql, ':error': migration.errorMessage as string });
    }

}
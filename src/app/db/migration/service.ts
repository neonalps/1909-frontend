import { environment } from '@src/environments/environment';
import { Injectable } from "@angular/core";
import { Repository } from "@src/app/db/repository";
import { MigrationRepository } from "@src/app/db/migration/repository";

interface MigrationJsonItem {
    id: string;
    sql: string;
};

@Injectable({
    providedIn: 'root',
})
export class MigrationService {

    private static readonly MIGRATION_TABLE = "migration";
    private static readonly MIGRATION_FILE_PATH = "./assets/migrations.json";

    private readonly isLoggingEnabled: boolean;

    constructor(private readonly migrationRepository: MigrationRepository, private readonly repository: Repository) {
        this.isLoggingEnabled = environment.production !== true;
    }

    public async migrate(): Promise<void> {
        console.log(`🛼 starting local db migration`);

        const [_, migrations] = await Promise.all([
            this.ensureMigrationTableExists(),
            this.loadMigrationsFromFile(),
        ]);

        for (const migration of migrations) {
            if ((await this.migrationRepository.getById(migration.id)) !== null) {
                this.logIfEnabled(`🎫 migration with ID ${migration.id} already exists`);
                continue;
            }

            try {
                await this.repository.raw(migration.sql);
                await this.migrationRepository.create({ id: migration.id, sql: migration.sql });
                this.logIfEnabled(`✅ successfully executed migration with ID ${migration.id}`);
            } catch (ex: unknown) {
                const errorMessage = (ex as Error).message;
                await this.migrationRepository.create({ id: migration.id, sql: migration.sql, errorMessage });
                this.logIfEnabled(`⭕ failed to execute migration with ID ${migration.id} because of: ${errorMessage}`);
            }
        }

        console.log(`🛼 local db migration finished`);

        await this.repository.printLocalDatabaseTables();
    }

    public async reset(): Promise<void> {
        await this.repository.raw(`delete from ${MigrationService.MIGRATION_TABLE}`);
    }

    private logIfEnabled(message: string): void {
        if (!this.isLoggingEnabled) {
            return;
        }

        console.log(message);
    }

    private async ensureMigrationTableExists(): Promise<void> {
        // check that migration table exists, create it if not
        if (!(await this.repository.tableExists(MigrationService.MIGRATION_TABLE))) {
            await this.repository.raw(`create table ${MigrationService.MIGRATION_TABLE} (id text primary key, sql text, error_message text);`);
        }
    }

    private async loadMigrationsFromFile(): Promise<MigrationJsonItem[]> {
        const migrations = await fetch(MigrationService.MIGRATION_FILE_PATH);
        return (await migrations.json()).migrations;
    }

}
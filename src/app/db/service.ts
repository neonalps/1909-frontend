import { Repository } from "@src/app/db/repository";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class RepositoryService {

    constructor(private readonly repository: Repository) {}

    /**
     * Should be called so the worker can initialize the database properly. If multiple read requests are sent to it at the same time,
     * it would fail with a file system error. So always make sure to await the call to this, afterwards multiple simultaneous requests are no problem.
     */
    public async init(): Promise<void> {
        await this.repository.raw("select 1;");
    }

    public async executeBatch(items: string[]): Promise<void> {
        if (!items || items.length === 0) {
            return;
        }

        const statements = items.map(item => {
            return { query: item };
        });

        await this.repository.transaction(statements);
    }

    public async createUpstreamTablesIfNotExist(): Promise<void> {
        const result = await this.repository.raw(`select count(*) from sqlite_master where type = 'table' and name = 'upstream`)
    }

}
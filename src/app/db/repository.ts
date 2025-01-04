import { Injectable } from "@angular/core";
import { initBackend } from 'absurd-sql/dist/indexeddb-main-thread';
import { UuidSource } from "@src/app/util/uuidSource";
import { isNotDefined } from "@src/app/util/common";
import { TimeSource } from "@src/app/util/timeSource";
import { WorkerManager } from "@src/app/worker/manager";

export interface ParameterizedQuery {
    query: string;
    params?: Record<string, string | number>;
}

@Injectable({
    providedIn: 'root',
})
export class Repository extends WorkerManager {
    
    private static QUERY_TYPE_PARAMETERIZED = "parameterized";
    private static QUERY_TYPE_RAW = "raw";
    private static QUERY_TYPE_TRANSACTION = "transaction";
    
    private static COUNT_SELECTOR = "count(1)";

    constructor(readonly timeSource: TimeSource, readonly uuidSource: UuidSource) {
        super({
            worker: new Worker(new URL("./worker/db.worker.js", import.meta.url)),
            onInitialized: (worker: Worker) => {
                initBackend(worker);
            },
            timestampCreator: {
                create: () => timeSource.getNow(),
            },
            idCreator: {
                create: () => uuidSource.createUuid(),
            },
        });
    }

    public query<T>(query: string, params?: Record<string, string | number>): Promise<T[]> {
        return this.postQueryToWorker(Repository.QUERY_TYPE_PARAMETERIZED, { query, params });
    }

    public async count(queryPart: string, params?: Record<string, string | number>): Promise<number> {
        const query = `select ${Repository.COUNT_SELECTOR} from ${queryPart}`;
        const result = await this.postQueryToWorker<Record<string, Object>[]>(Repository.QUERY_TYPE_PARAMETERIZED, { query, params });
        if (result.length !== 1) {
            throw new Error(`Unexpected number of result rows`);
        }
        return result[0][Repository.COUNT_SELECTOR] as number;
    }

    public async tableExists(tableName: string): Promise<boolean> {
        const countResult = await this.count(`sqlite_master where type = :type and name = :name`, { ':type': 'table', ':name': tableName });
        return countResult === 1;
    }

    public async printLocalDatabaseTables(): Promise<void> {
        console.log(`🚡 local db tables`, await this.query(`select * from sqlite_master where type = :type`, { ':type': 'table' }));
    }

    /**
     * Convenience method for querying the database for an object by unique ID. Will return the first record returned by the query, null if no records were found.
     * @param query the SQL query
     * @param params the params for the SQL query
     * @returns the first record of the SQL query or null if no records were found
     */
    public async queryById<T>(query: string, params?: Record<string, string | number>): Promise<T | null> {
        const arrayResult = await this.query<T>(query, params);
        return arrayResult.length > 0 ? arrayResult[0] : null;
    }

    public async transaction(statements: ParameterizedQuery[]): Promise<void> {
        if (isNotDefined(statements) || statements.length === 0) {
            return;
        }

        await this.postQueryToWorker(Repository.QUERY_TYPE_TRANSACTION, statements);
    }

    public raw<T>(query: string): Promise<T[]> {
        return this.postQueryToWorker(Repository.QUERY_TYPE_RAW, { query });
    }

}
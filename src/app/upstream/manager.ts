import { WorkerManager } from "@src/app/worker/manager";
import { TimeSource } from "@src/app/util/timeSource";
import { UuidSource } from "@src/app/util/uuidSource";
import { Injectable } from "@angular/core";
import { Repository } from "@src/app/db/repository";

export interface WorkerUpstreamResponse {
    items: UpstreamItem[];
}

export interface UpstreamResponseDto {
    success: boolean;
    response?: WorkerUpstreamResponse;
    error?: {
        message: string;
    }
}

export interface UpstreamItem {
    timestamp: string;
    query: string;
}

@Injectable({
    providedIn: 'root',
})
export class UpstreamManager extends WorkerManager {

    constructor(
        readonly repository: Repository,
        readonly timeSource: TimeSource, 
        readonly uuidSource: UuidSource,
    ) {
        super({
            worker: new Worker(new URL("./worker/upstream.worker.js", import.meta.url)),
            timestampCreator: {
                create: () => timeSource.getNow(),
            },
            idCreator: {
                create: () => uuidSource.createUuid(),
            },
        });
    }

    public async fetchUpstreamItems(lastSeenSyncTimestamp: string | null): Promise<UpstreamResponseDto> {
        try {
            const workerResponse = await this.postQueryToWorker<WorkerUpstreamResponse>("fetchUpstream", {
                lastSeenSyncTimestamp,
            });
            return {
                success: true,
                response: workerResponse,
            };
        } catch (ex) {
            return {
                success: false,
                error: {
                    message: (ex as Error).message,
                }
            }
        }
    }

    public async registerItem(upstreamItem: string): Promise<void> {
        return this.registerItems([upstreamItem]);
    }

    public async registerItems(upstreamItems: string[]): Promise<void> {
        // TODO: create transaction that 1) applies all upstream items inside a transaction 2) adds all upstream items to the sync table

        /*
        const batch: ParameterizedQuery[] = [
            ...upstreamItems.map(item => {
                return { 
                    query: item 
                };
            }),
            ...upstreamItems.map(item => {
                return { 
                    query: `insert into sync (id, created_at, query) values (:id, :createdAt, :query)`, 
                    params: { 
                        ':id': this.uuidSource.createUuid(), 
                        ':createdAt': this.timeSource.getCurrentIsoDate(), 
                        ':query': item 
                    }
                };
            })
        ];*/

        // TODO uncomment
        // await this.repository.transaction(batch);

        /*for (const item of batch) {
            console.log(`registering upstream item`, item.query, item.params);
        }*/
    }

}
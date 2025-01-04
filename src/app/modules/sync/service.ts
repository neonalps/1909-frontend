import { Injectable } from "@angular/core";
import { SyncState } from "@src/app/constants/sync-state";
import { ParameterizedQuery, Repository } from "@src/app/db/repository";
import { ControlRoom } from "@src/app/modules/control-room/service";
import { UpstreamManager } from "@src/app/upstream/manager";
import { isNotDefined } from "@src/app/util/common";
import { ControlRoomRepository } from "@src/app/modules/control-room/repository";

@Injectable({
    providedIn: 'root',
})
export class SyncService {

    constructor(
        private readonly controlRoom: ControlRoom,
        private readonly repository: Repository,
        private readonly upstreamManager: UpstreamManager,
    ) {}

    public async fetchAndProcessUpstreamItems(): Promise<void> {
        const lastSeenSyncTimestamp = await this.controlRoom.get<string>(SyncState.LastSeenTimestamp);
        console.log('the last seen sync timestamp is', lastSeenSyncTimestamp);
        const upstreamResponse = await this.upstreamManager.fetchUpstreamItems(lastSeenSyncTimestamp);
        if (upstreamResponse.success !== true) {
            console.info(`❌ could not fetch upstream items`, upstreamResponse.error);
            return;
        }

        const upstreamResponseItems = upstreamResponse.response?.items;
        if (!upstreamResponseItems || upstreamResponseItems.length === 0) {
            console.info(`🗳️ no upstream items to process`);
            return;
        }

        console.log('trying to process', upstreamResponseItems);
        
        const newCurrentSyncTimestamp = upstreamResponseItems[upstreamResponseItems.length - 1].timestamp;
        const transactionBatch: ParameterizedQuery[] = [
            ...this.convertQueryStrings(upstreamResponseItems.map(item => item.query)),
            //ControlRoomRepository.getSetPropQuery(SyncState.LastSeenTimestamp, newCurrentSyncTimestamp),
        ];

        try {
            await this.repository.transaction(transactionBatch);
            console.info(`✅ successfully processed upstream items, new sync timestamp ${newCurrentSyncTimestamp}`);
        } catch (ex) {
            console.log('failed to process upstream items');
        }
    }

    private convertQueryStrings(items: string[]): ParameterizedQuery[] {
        if (isNotDefined(items) || items.length === 0) {
            return [];
        }

        return items.map(item => {
            return {
                query: item,
            }
        })
    }

}
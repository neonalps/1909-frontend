import { isDefined, isNotDefined } from "@src/app/util/common";

interface Creator<T> {
    create: () => T;
}

export type MessageIdCreator = Creator<string>;
export type MessageTimestampCreator = Creator<number>;
 
export interface WorkerManagerConfig {
    worker: Worker,
    idCreator: MessageIdCreator,
    timestampCreator: MessageTimestampCreator,
    onInitialized?: Function;
}

export interface PendingWorkerResult {
    createdAt: number;
    onSuccess: Function;
    onError: Function;
}

export abstract class WorkerManager {

    private static ONE_HOUR_IN_MILLISECONDS = 60 * 60 * 1000;

    private readonly worker: Worker;
    private readonly pendingResultMap: Map<string, PendingWorkerResult> = new Map();

    private isInitialized = false;

    constructor(private readonly config: WorkerManagerConfig) {
        if (isNotDefined(this.config)) {
            throw new Error(`Worker manager config must be defined`);
        }

        this.worker = this.config.worker;
        this.worker.onmessage = message => this.onWorkerMessage(message);
        this.isInitialized = true;

        if (this.config.onInitialized !== undefined) {
            this.config.onInitialized(this.worker);
        }
    }

    protected postQueryToWorker<T>(queryType: string, queryPayload: unknown): Promise<T> {
        if (!this.isInitialized) {
            throw new Error(`Worker is not initialized`);
        }

        return new Promise((resolve, reject) => {
            const createdAt = this.config.timestampCreator.create();
            const messageId = this.config.idCreator.create();
            this.pendingResultMap.set(messageId, {
                createdAt,
                onSuccess: resolve,
                onError: reject,
            });

            this.worker.postMessage({
                id: messageId,
                type: queryType,
                payload: queryPayload,
            });
        });
    }

    private onWorkerMessage(message: MessageEvent) {
        const messageId = message.data.id;
        const messageType = message.data.type;
        const messagePayload = message.data.payload;
        const pendingResult = this.pendingResultMap.get(messageId);

        if (messageType === "result") {
            pendingResult?.onSuccess(messagePayload);
        } else if (messageType === "error") {
            pendingResult?.onError(messagePayload);
        }

        this.pendingResultMap.delete(messageId);
        
        this.removeStalePendingResults();
    }

    private removeStalePendingResults(): void {
        const keysToRemove: string[] = [];

        for (const [key, value] of this.pendingResultMap) {
            if (isDefined(value?.createdAt) && value.createdAt < (this.config.timestampCreator.create() - WorkerManager.ONE_HOUR_IN_MILLISECONDS)) {
                keysToRemove.push(key);
            }
        }

        for (const key of keysToRemove) {
            this.pendingResultMap.delete(key);
        }
    }

}
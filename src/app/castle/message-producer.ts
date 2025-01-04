import { SyncableEntity } from "@src/app/models/dao/syncable-entity";
import { MessageEnvelope } from "@src/app/castle/models";
import { Injectable } from "@angular/core";
import { validateDefined, validateHasText } from "@src/app/util/validation";
import { Dataset } from "@src/app/constants/dataset";
import { serializeValue } from "@src/app/crdt/util";

@Injectable({
    providedIn: 'root'
})
export class MessageProducer {

    public static readonly FIELD_TOMBSTONE = "tombstone";

    private static readonly DELETE_ITEM = {
        [MessageProducer.FIELD_TOMBSTONE]: true,
    };

    public forCreate(dataset: Dataset, item: SyncableEntity): MessageEnvelope[] {
        validateHasText(dataset, "dataset");
        validateDefined(item, "item");

        return this.createMessages(dataset, item.id, item);
    }

    public forDelete(dataset: Dataset, id: string): MessageEnvelope[] {
        validateHasText(dataset, "dataset");
        validateHasText(id, "id");

        return this.createMessages(dataset, id, MessageProducer.DELETE_ITEM);
    }

    public forUpdate(dataset: Dataset, id: string, updatePartial: object): MessageEnvelope[] {
        validateHasText(dataset, "dataset");
        validateHasText(id, "id");
        validateDefined(updatePartial, "updatePartial");

        return this.createMessages(dataset, id, updatePartial);
    }

    private createMessages(dataset: Dataset, id: string, item: object): MessageEnvelope[] {
        return Object.keys(item)
            .filter(key => key !== "id")
            .map(key => {
                const value: unknown = (item as any)[key];

                return {
                    timestamp: "timestamp",
                    dataset,
                    row: id,
                    column: key,
                    value: serializeValue(value),
                };
            });
    }

}
import { Injectable } from "@angular/core";
import { MessageSerializer } from "@src/app/castle/message-serializer";
import { MessageEnvelope } from "@src/app/castle/models";
import { validateDefined } from "@src/app/util/validation";

@Injectable({
    providedIn: 'root',
})
export class JsonSerializer implements MessageSerializer<string> {

    public serialize(item: MessageEnvelope): string {
        validateDefined(item, "item");

        return JSON.stringify(item);
    }

    public deserialize(serializedItem: string): MessageEnvelope {
        validateDefined(serializedItem, "serializedItem");

        return JSON.parse(serializedItem) as MessageEnvelope;
    }

}
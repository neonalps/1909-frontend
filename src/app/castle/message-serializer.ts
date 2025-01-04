import { MessageEnvelope } from "@src/app/castle/models";

export interface MessageSerializer<T> {
    serialize(item: MessageEnvelope): T;
    deserialize(serializedItem: T): MessageEnvelope;
}
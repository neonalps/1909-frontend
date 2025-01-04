import { Injectable } from "@angular/core";
import { deserializeValue, serializeValue } from "@src/app/crdt/util";
import { ParameterizedQuery, Repository } from "@src/app/db/repository";
import { ControlRoomDaoInterface } from "@src/app/models/interface/control-room.interface";

@Injectable({
    providedIn: 'root',
})
export class ControlRoomRepository {

    constructor(private readonly repository: Repository) {}

    public async set(key: string, value: unknown): Promise<void> {
        const query: ParameterizedQuery = {
            query: `insert into control_room (prop, value) values (:prop, :value) on conflict do update set value = excluded.value`,
            params: { ':prop': key, ':value': serializeValue(value) },
        };

        await this.repository.query(query.query, query.params);
    }

    public async get<T>(key: string): Promise<T | null> {
        const prefixedValue = await this.repository.queryById<ControlRoomDaoInterface>(`select * from control_room where prop = :prop`, { ':prop': key });
        if (prefixedValue === null) {
            return null;
        }

        return deserializeValue(prefixedValue.value) as T;
    }

    public async delete(key: string): Promise<void> {
        await this.repository.query(`delete from control_room where prop = :prop`, { ':prop': key });
    }

}
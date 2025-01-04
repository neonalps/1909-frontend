import { Injectable } from "@angular/core";
import { ControlRoomRepository } from "@src/app/modules/control-room/repository";
import { validateDefined, validateHasText } from "@src/app/util/validation";

@Injectable({
    providedIn: 'root',
})
export class ControlRoom {

    constructor(private readonly repository: ControlRoomRepository) {}

    public async set(key: string, value: unknown): Promise<void> {
        validateHasText(key, "key");
        validateDefined(value, "value");

        return this.repository.set(key, value);
    }

    public async get<T>(key: string): Promise<T | null> {
        validateHasText(key, "key");

        return this.repository.get(key);
    }

    public async delete(key: string): Promise<void> {
        validateHasText(key, "key");

        await this.repository.delete(key);
    }

}
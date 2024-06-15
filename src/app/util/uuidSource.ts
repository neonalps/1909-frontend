import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class UuidSource {

    public createUuid(): string {
        return crypto.randomUUID();
    }

    public createShortUuid(): string {
        return this.createUuid().substring(19).replace("-", "");
    }

}
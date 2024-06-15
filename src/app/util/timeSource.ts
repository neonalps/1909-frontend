import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class TimeSource {

    public getCurrentIsoDate(): string {
        return new Date().toISOString();
    }

    public getNow(): number {
        return Date.now();
    }

}
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class OnlineEventListener {

    private online: boolean = false;

    constructor() {
        this.init();
    }

    private init(): void {
        window.addEventListener('offline', () => {
            this.online = false;
            console.log('we are currently offline');
        });

        window.addEventListener('online', () => {
            this.online = true;
            console.log('we are currently online');
        });
    }

}
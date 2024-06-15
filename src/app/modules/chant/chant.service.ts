import { Injectable } from '@angular/core';
import { environment } from '@src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ChantService {

    private readonly mainClubChants: string[] = environment.mainClub.chants;

    constructor() {}

    public getRandomChant(): string {
        return this.mainClubChants[Math.floor(Math.random() * this.mainClubChants.length)];
    }

}
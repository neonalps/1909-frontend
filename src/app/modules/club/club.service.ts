import { Injectable } from "@angular/core";
import { ClubDao } from "@src/app/models/dao/club.dao";
import { ClubRepositoy } from "@src/app/modules/club/club.repository";
import { validateDefined } from "@src/app/util/validation";

@Injectable({
    providedIn: 'root',
})
export class ClubService {

    constructor(private readonly repository: ClubRepositoy) {}

    public getAll(): Promise<ClubDao[]> {
        return this.repository.getAll();
    }

    public getById(clubId: string): Promise<ClubDao | null> {
        validateDefined(clubId, "clubId");

        return this.repository.getById(clubId);
    }

    public async idExists(clubId: string): Promise<boolean> {
        return (await this.getById(clubId)) !== null;
    }

}
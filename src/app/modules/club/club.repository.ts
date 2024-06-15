import { Injectable } from "@angular/core";
import { Repository } from "@src/app/db/repository";
import { ClubDao } from "@src/app/models/dao/club.dao";
import { ClubDaoInterface } from "@src/app/models/interface/club.interface";

@Injectable({
    'providedIn': 'root',
})
export class ClubRepositoy {

    constructor(private readonly repository: Repository) {}

    async getAll(): Promise<ClubDao[]> {
        const items = await this.repository.query<ClubDaoInterface>(`select * from club`);
        return items.map(item => ClubDao.fromDaoInterface(item));
    }

    async getById(clubId: string): Promise<ClubDao | null> {
        const item = await this.repository.queryById<ClubDaoInterface>(`select * from club where id = :id`, { ':id': clubId });
        return item !== null ? ClubDao.fromDaoInterface(item) : null;
    }

}
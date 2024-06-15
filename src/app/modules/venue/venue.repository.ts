import { Injectable } from "@angular/core";
import { Repository } from "@src/app/db/repository";
import { VenueDao } from "@src/app/models/dao/venue.dao";
import { VenueDaoInterface } from "@src/app/models/interface/venue.interface";

@Injectable({
    providedIn: 'root',
})
export class VenueRepository {

    constructor(private readonly repository: Repository) {}

    async getAll(): Promise<VenueDao[]> {
        const items = await this.repository.query<VenueDaoInterface>(`select * from venue`);
        return items.map(item => VenueDao.fromDaoInterface(item));  
    }

    async getById(venueId: string): Promise<VenueDao | null> {
        const item = await this.repository.queryById<VenueDaoInterface>(`select * from venue where id = :id`, { ':id': venueId });
        return item !== null ? VenueDao.fromDaoInterface(item) : null;
    }

}
import { Injectable } from "@angular/core";
import { Repository } from "@src/app/db/repository";
import { CompetitionDao } from "@src/app/models/dao/competition.dao";
import { CompetitionDaoInterface } from "@src/app/models/interface/competition.interface";

@Injectable({
    providedIn: 'root',
})
export class CompetitionRepository {

    constructor(private readonly repository: Repository) {}

    async getAll(): Promise<CompetitionDao[]> {
        const items = await this.repository.query<CompetitionDaoInterface>(`select * from competition`);
        return items.map(item => CompetitionDao.fromDaoInterface(item));
    }

    async getById(competitionId: string): Promise<CompetitionDao | null> {
        const item = await this.repository.queryById<CompetitionDaoInterface>(`select * from competition where id = :id`, { ':id': competitionId });
        return item !== null ? CompetitionDao.fromDaoInterface(item) : null;
    }

}
import { Injectable } from "@angular/core";
import { Repository } from "@src/app/db/repository";
import { SeasonDao } from "@src/app/models/dao/season.dao";
import { CreateSeasonDto } from "@src/app/models/dto/create-season.dto";
import { SeasonDaoInterface } from "@src/app/models/interface/season.interface";
import { UpstreamManager } from "@src/app/upstream/manager";
import { convertDateToDateString } from "@src/app/util/common";

@Injectable({
    providedIn: 'root'
})
export class SeasonRepository {

    constructor(private readonly repository: Repository, private readonly upstreamManager: UpstreamManager) {}

    async create(dto: CreateSeasonDto): Promise<SeasonDao> {
        const query = `insert into season (id, name, short_name, from_, to_) values ('${dto.id}', '${dto.name}', '${dto.shortName}', '${convertDateToDateString(dto.from)}', '${convertDateToDateString(dto.to)}')`;
        
        await this.upstreamManager.registerItem(query);

        const createdItem = await this.getById(dto.id);
        if (createdItem === null) {
            throw new Error(`It looks like the item was not created`);
        }
        return createdItem;
    }

    async getAll(): Promise<SeasonDao[]> {
        const items = await this.repository.query<SeasonDaoInterface>(`select * from season order by from_ desc`);
        return items.map(item => SeasonDao.fromDaoInterface(item));
    }

    async getById(seasonId: string): Promise<SeasonDao | null> {
        const item = await this.repository.queryById<SeasonDaoInterface>(`select * from season where id = :id`, { ':id': seasonId });
        return item !== null ? SeasonDao.fromDaoInterface(item) : null;
    }

}
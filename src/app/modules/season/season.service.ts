import { Injectable } from '@angular/core';
import { SeasonDao } from '@src/app/models/dao/season.dao';
import { CreateSeasonDto } from '@src/app/models/dto/create-season.dto';
import { SeasonRepository } from '@src/app/modules/season/season.repository';
import { UpstreamManager } from '@src/app/upstream/manager';
import { validateDefined, validateHasText } from '@src/app/util/validation';

@Injectable({
  providedIn: 'root'
})
export class SeasonService {

  constructor(private readonly repository: SeasonRepository, private readonly upstreamManager: UpstreamManager) {}

  async create(dto: CreateSeasonDto): Promise<SeasonDao> {
    validateDefined(dto, "dto");
    validateHasText(dto.id, "dto.id");
    validateHasText(dto.name, "dto.name");
    validateHasText(dto.shortName, "dto.shortName");
    validateDefined(dto.from, "dto.from");
    validateDefined(dto.to, "dto.to");

    return this.repository.create(dto);
  }

  getById(seasonId: string): Promise<SeasonDao | null> {
    validateDefined(seasonId, "seasonId");

    return this.repository.getById(seasonId);
  }

  getAll(): Promise<SeasonDao[]> {
    return this.repository.getAll();
  }

}

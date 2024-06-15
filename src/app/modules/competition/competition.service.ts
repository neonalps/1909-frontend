import { Injectable } from "@angular/core";
import { CompetitionDao } from "@src/app/models/dao/competition.dao";
import { CompetitionRepository } from "@src/app/modules/competition/competition.repository";
import { validateHasText } from "@src/app/util/validation";

@Injectable({
    providedIn: 'root',
})
export class CompetitionService {

    constructor(private readonly competitionRepository: CompetitionRepository) {}

    getAll(): Promise<CompetitionDao[]> {
        return this.competitionRepository.getAll();
    }

    getById(competitionId: string): Promise<CompetitionDao | null> {
        validateHasText(competitionId, "competitionId");

        return this.competitionRepository.getById(competitionId);
    }

}
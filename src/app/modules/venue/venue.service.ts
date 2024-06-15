import { Injectable } from "@angular/core";
import { VenueDao } from "@src/app/models/dao/venue.dao";
import { VenueRepository } from "@src/app/modules/venue/venue.repository";
import { validateHasText } from "@src/app/util/validation";

@Injectable({
    providedIn: 'root',
})
export class VenueService {

    constructor(private readonly venueRepository: VenueRepository) {}

    getAll(): Promise<VenueDao[]> {
        return this.venueRepository.getAll();
    }

    getById(venueId: string): Promise<VenueDao | null> {
        validateHasText(venueId, "venueId");

        return this.venueRepository.getById(venueId);
    }

}
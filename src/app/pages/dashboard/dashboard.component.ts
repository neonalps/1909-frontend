import { Component, OnInit } from '@angular/core';
import { CreateSeasonDto } from '@src/app/models/dto/create-season.dto';
import { ClubService } from '@src/app/modules/club/club.service';
import { CompetitionService } from '@src/app/modules/competition/competition.service';
import { SeasonService } from '@src/app/modules/season/season.service';
import { VenueService } from '@src/app/modules/venue/venue.service';
import { UuidSource } from '@src/app/util/uuidSource';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
  }

}

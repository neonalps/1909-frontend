import { Component, OnInit } from '@angular/core';
import { MessageProducer } from '@src/app/castle/message-producer';
import { Dataset } from '@src/app/constants/dataset';
import { MigrationService } from '@src/app/db/migration/service';
import { Repository } from '@src/app/db/repository';
import { SeasonDao } from '@src/app/models/dao/season.dao';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  constructor(
    private readonly messageProducer: MessageProducer, 
    private readonly migrationService: MigrationService,
    private readonly repository: Repository,
  ) {}

  ngOnInit(): void {

    const season: SeasonDao = {
      id: "04fe22d9-1083-4e8d-89a0-d486099af346",
      name: "2024/2025",
      shortName: "24/25",
      from: new Date(2024, 7, 1),
      to: new Date(2025, 6, 30),
    };

    console.log(this.messageProducer.forCreate(Dataset.Season, season));

    const updatedSeason: Partial<SeasonDao> = {
      name: "⚽ 2024/2025",
      shortName: "⚽ 24/25",
    }

    console.log(this.messageProducer.forUpdate(Dataset.Season, season.id,  updatedSeason));

    console.log(this.messageProducer.forDelete(Dataset.Season, season.id));

    setTimeout(() => this.load(), 400); 

  }

  private async load() {
    await this.repository.printLocalDatabaseTables();

    await this.migrationService.migrate();
  }

}

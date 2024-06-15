import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RepositoryService } from '@src/app/db/service';
import { timeout } from '@src/app/util/common';
import { UpstreamManager } from '@src/app/upstream/manager';
import { ChantService } from '@src/app/modules/chant/chant.service';
import { TimeSource } from '@src/app/util/timeSource';

@Component({
  selector: 'app-splash-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './splash-screen.component.html',
  styleUrl: './splash-screen.component.css'
})
export class SplashScreenComponent implements OnInit {

  private static readonly TARGET_SPLASH_SCREEN_TIME_MS = 1200;

  windowWidth!: string;
  chant: string;
  showSplashScreen: boolean = true;

  constructor(
    private readonly chantService: ChantService,
    private readonly repositoryService: RepositoryService,
    private readonly timeSource: TimeSource,
    private readonly upstreamManager: UpstreamManager
  ) {
    this.chant = this.chantService.getRandomChant();
  }

  ngOnInit(): void {
    this.registerHideLogic();
  }
  
  private async registerHideLogic(): Promise<void> {
    const start = this.timeSource.getNow();

    const [upstreamResponse] = await Promise.all([
      this.upstreamManager.fetchUpstreamItems(),
      this.repositoryService.init(),
    ]);

    if (upstreamResponse.success === true && upstreamResponse.response !== undefined) {
      await this.repositoryService.executeBatch(upstreamResponse.response.items.map(item => item.query));
    } else {
      console.log('No upstream items received');
    }

    const end = this.timeSource.getNow();
    const took = end - start;

    const diffToTarget = SplashScreenComponent.TARGET_SPLASH_SCREEN_TIME_MS - took;
    if (diffToTarget > 0) {
      await timeout(diffToTarget);
    }

    this.windowWidth = `-${window.innerWidth}px`;

    setTimeout(() => {
      this.showSplashScreen = false;
      console.log(`load took ${took}ms`);
    }, 500);
  }

}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MsToTimePipe} from '../../../../shared/pipes/ms-to-time-pipe';
import {LeaderboardRacer} from './racing-leaderboard-page-components/leaderboard-racer/leaderboard-racer';
import {Helmet} from './racing-leaderboard-page-components/helmet/helmet';
import {LiveStatus} from './racing-leaderboard-page-components/live-status/live-status';
import {Button} from '../../../../shared/components/ui/button/button';



@NgModule({
  declarations: [
    LeaderboardRacer,
    Helmet,
    LiveStatus
  ],
  imports: [
    CommonModule,
    MsToTimePipe,
    Button
  ],
  exports: [
    LeaderboardRacer,
    Helmet,
    LiveStatus
  ]
})
export class RacingLeaderboardPageComponentsModule { }

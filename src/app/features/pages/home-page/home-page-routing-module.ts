import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePage} from './home-page';
import {RacingLeaderboardPage} from '../racing-leaderboard-page/racing-leaderboard-page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: '',
        component: RacingLeaderboardPage
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }

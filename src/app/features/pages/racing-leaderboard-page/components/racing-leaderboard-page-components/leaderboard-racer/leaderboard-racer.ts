import {Component, input} from '@angular/core';
import {User} from '../../../../../../core/types/user.types';
import {Color} from '../../../../../../core/types/color.types';

@Component({
  selector: 'div[app-leaderboard-racer]',
  standalone: false,
  templateUrl: './leaderboard-racer.html',
  styleUrl: './leaderboard-racer.scss',
})
export class LeaderboardRacer {
  user = input.required<User>();
  isSelected = input<boolean>();

  public getColor(color?: Color): string {
    if (!color) { return ''; }

    return {
      'red': '#ff4444',
      'green': '#44ff44',
      'blue': '#4444ff'
    }[color.toLocaleLowerCase()] || '#4444ff';
  }
}

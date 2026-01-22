import {Component, inject, OnDestroy, ViewChild, ElementRef, signal, OnInit} from '@angular/core';
import { SignalrService } from '../../../core/services/signalr.service';
import { LeaderboardService } from '../../../core/services/leaderboard.service';
import { User } from '../../../core/types/user.types';
import { Input } from '../../../shared/components/ui/input/input';
import {
  CdkFixedSizeVirtualScroll,
  CdkVirtualForOf,
  CdkVirtualScrollViewport,
  ScrollDispatcher
} from '@angular/cdk/scrolling';
import {debounceTime} from 'rxjs';
import {RacingLeaderboardPageComponentsModule} from './components/racing-leaderboard-page-components-module';

@Component({
  selector: 'app-racing-leaderboard-page',
  standalone: true,
  imports: [
    Input,
    CdkFixedSizeVirtualScroll,
    CdkVirtualForOf,
    CdkVirtualScrollViewport,
    RacingLeaderboardPageComponentsModule
  ],
  templateUrl: './racing-leaderboard-page.html',
  styleUrl: './racing-leaderboard-page.scss',
})
export class RacingLeaderboardPage implements OnInit, OnDestroy {
  @ViewChild(CdkVirtualScrollViewport) viewport!: CdkVirtualScrollViewport;
  @ViewChild('loadTrigger') loadTrigger!: ElementRef;

  private signalrService: SignalrService = inject(SignalrService);
  private leaderboardService: LeaderboardService = inject(LeaderboardService);
  private scrollDispatcher: ScrollDispatcher = inject(ScrollDispatcher);

  public readonly users = this.leaderboardService.users;
  public readonly connectionStatus = this.signalrService.connectionStatus;
  public isServerAlive = this.signalrService.isServerAlive;
  public searchTerm = signal('');
  public selectedUser = signal<User | null>(null);
  public liveMode = signal(false);

  readonly trackByFn = (i: number, user: User) => user.name;

  public ngOnInit(): void {
    this.leaderboardService.loadInitial();
    this.scrollDispatcher.scrolled()
      .pipe(debounceTime(50))
      .subscribe(() => this.onScroll());
  }

  public ngOnDestroy(): void {
    this.liveMode() && this.signalrService.disconnect();
  }

  public handleValueSearch(value: string): void {
    this.searchTerm.set(value);
    this.leaderboardService.updateSearch(value);
  }

  public handleSelect(user: User): void {
    this.selectedUser.set(this.selectedUser()?.name === user.name ? null : user);
  }

  public async handleToggleLive(): Promise<void> {
    if (this.liveMode()) {
      this.signalrService.disconnect();
    } else {
      await this.signalrService.startLiveRaces();
    }

    this.liveMode.update(l => !l);
  }

  public onScroll(): void {
    if (!this.viewport || !this.loadTrigger) { return; }

    const rect =  this.loadTrigger.nativeElement.getBoundingClientRect();
    if (rect.top < window.innerHeight + 100) {
      this.leaderboardService.loadMore();
    }
  }
}

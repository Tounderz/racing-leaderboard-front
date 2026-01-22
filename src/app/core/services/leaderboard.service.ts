import {computed, inject, Injectable, signal} from '@angular/core';
import {User} from '../types/user.types';
import {MockService} from './mock.service';
import {EventsService} from './events.service';

@Injectable({
  providedIn: 'root',
})
export class LeaderboardService {
  private mockService: MockService = inject(MockService);
  private eventsService: EventsService = inject(EventsService);

  private _allGeneratedUsers = signal<Array<User>>([]);
  private _displayedCount = signal(0);
  private _searchTerm = signal('');
  private pageSize = 50;
  private totalAvailable = 5000;

  public users = computed(() => {
    const users = this._allGeneratedUsers().slice(0, this._displayedCount());
    return this._searchTerm()
      ? users.filter(u => u.name.toLowerCase().includes(this._searchTerm().toLowerCase()))
      : users;
  });

  private readonly eventsSubscription = this.eventsService.events.subscribe(event => {
    event?.type === 'user-updated' && this.updateLiveUser(event.data as User);
  });

  public loadInitial(): void {
    const users = this.mockService.generateUsers(this.pageSize);
    this._allGeneratedUsers.set(users);
    this._displayedCount.set(this.pageSize);
  }

  public loadMore(): void {
    if (this._displayedCount() >= this.totalAvailable) { return; }

    const newUsers = this.mockService.generateUsers(this.pageSize);
    this._allGeneratedUsers.update(users => [...users, ...newUsers]);
    this._displayedCount.update(count => count + this.pageSize);
  }

  public updateSearch(term: string): void {
    this._searchTerm.set(term);
  }

  public addUser(user: User): void {
    this._allGeneratedUsers.update(users => {
      const filtered = users.filter(u => u.name !== user.name);
      return [user, ...filtered]
        .sort((a, b) => a.time - b.time)
        .slice(0, this._displayedCount());
    });
  }

  private updateLiveUser(user: User): void {
    this._allGeneratedUsers.update(users => {
      const filtered = users.filter(u => u.name !== user.name);
      return [user, ...filtered]
        .sort((a, b) => a.time - b.time)
        .slice(0, this._displayedCount());
    });
  }
}

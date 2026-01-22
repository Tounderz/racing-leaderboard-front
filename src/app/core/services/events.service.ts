import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {UserEvent} from '../types/user-event.types';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  private eventsSubject = new Subject<UserEvent>();
  public readonly events: Observable<UserEvent> = this.eventsSubject.asObservable();

  public emit(event: UserEvent): void {
    this.eventsSubject.next(event);
  }
}

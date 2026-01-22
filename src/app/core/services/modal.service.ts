import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ModalConfig} from '../types/modal.types';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modalSubject = new BehaviorSubject<ModalConfig | null>(null);
  public modal$ = this.modalSubject.asObservable();

  public open(config: ModalConfig): void {
    this.modalSubject.next(config);
  }

  public close(): void {
    this.modalSubject.next(null);
  }
}

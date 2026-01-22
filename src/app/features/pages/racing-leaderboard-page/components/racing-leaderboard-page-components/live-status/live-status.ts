import {ChangeDetectionStrategy, Component, computed, EventEmitter, input, Output} from '@angular/core';
import {ConnectionStatus} from '../../../../../../core/types/connection-status.types';

@Component({
  selector: 'app-live-status',
  standalone: false,
  templateUrl: './live-status.html',
  styleUrl: './live-status.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LiveStatus {
  liveMode = input<boolean>(false);
  connectionStatus = input<ConnectionStatus>('disconnected');
  isServerAlive = input<boolean>(false);
  @Output() toggleLive: EventEmitter<void> = new EventEmitter<void>();

  public statusClass = computed(() => this.connectionStatus());

  public statusText = computed(() => !this.liveMode() ? '⚫ Live пауза' : ({
    connected: '🟢 Live активен',
    connecting: '⏳ Подключение...',
    error: '🔴 Сервер упал',
    disconnected: '⚫ Live пауза'
  }[this.connectionStatus()] ?? '⚫ Live пауза'));

  public buttonText = computed(() =>
    this.liveMode()
      ? (this.connectionStatus() === 'connected' ? '⏸️ Пауза' : '🔌 Переподключить')
      : '▶️ Live'
  );

  public handleToggleLive(): void {
    this.toggleLive.emit();
  };
}

import { Injectable, inject, signal, computed, effect } from '@angular/core';
import { HubConnection, HubConnectionBuilder, HubConnectionState, LogLevel } from '@microsoft/signalr';
import { EventsService } from './events.service';
import { ConnectionStatus } from '../types/connection-status.types';
import { User } from '../types/user.types';
import {signalrConfig} from '../models/signalr-config';

@Injectable({ providedIn: 'root' })
export class SignalrService {
  private eventsService = inject(EventsService);
  private hubConnection: HubConnection | null = null;
  private connectingTimeout: number | null = null;

  public readonly connectionStatus = signal<ConnectionStatus>('disconnected');
  public readonly lastHeartbeat = signal(Date.now());

  public readonly isConnected = computed(() => this.connectionStatus() === 'connected');
  public readonly isServerAlive = computed(() => {
    return Date.now() - this.lastHeartbeat() < signalrConfig.heartbeatTimeout;
  });

  private readonly autoReconnectEffect = effect(() => {
    if (this.connectionStatus() === 'disconnected' && this.isConnected()) {
      this.connect();
    }
  });

  private readonly serverHealthEffect = effect(() => {
    if (!this.isServerAlive() && this.isConnected()) {
      this.eventsService.emit({ type: 'server-offline' });
    }
  });

  public async startLiveRaces(): Promise<void> {
    this.connectionStatus.set('connecting');
    if (!this.hubConnection || this.hubConnection.state !== HubConnectionState.Connected) {
      await this.connect();
    }

    await this.hubConnection?.invoke('StartLiveRaces');
  }

  public disconnect(): void {
    this.clearConnectingTimeout();
    this.hubConnection?.stop();
    this.connectionStatus.set('disconnected');
  }

  private async connect(): Promise<void> {
    this.clearConnectingTimeout();
    this.connectionStatus.set('connecting');

    this.connectingTimeout = window.setTimeout(() => {
      if (this.connectionStatus() === 'connecting') {
        this.connectionStatus.set('error');
      }
    }, signalrConfig.connectionTimeout);

    this.hubConnection = new HubConnectionBuilder()
      .withUrl(signalrConfig.hubUrl)
      .withAutomaticReconnect(signalrConfig.reconnectDelays)
      .configureLogging(LogLevel.Information)
      .build();

    this.setupHandlers();
    this.hubConnection.on('UserUpdated', (user: User) => {
      this.lastHeartbeat.set(Date.now());
      this.eventsService.emit({ type: 'user-updated', data: user });
    });

    try {
      await this.hubConnection.start();
      this.clearConnectingTimeout();
      this.connectionStatus.set('connected');
      this.lastHeartbeat.set(Date.now());
    } catch {
      this.clearConnectingTimeout();
      this.connectionStatus.set('error');
    }
  }

  private setupHandlers(): void {
    const hub = this.hubConnection!;
    hub.onclose(() => this.connectionStatus.set('disconnected'));
    hub.onreconnecting(() => this.connectionStatus.set('connecting'));
    hub.onreconnected(() => {
      this.clearConnectingTimeout();
      this.connectionStatus.set('connected');
      this.lastHeartbeat.set(Date.now());
    });
  }

  private clearConnectingTimeout(): void {
    if (this.connectingTimeout) {
      clearTimeout(this.connectingTimeout);
      this.connectingTimeout = null;
    }
  }
}

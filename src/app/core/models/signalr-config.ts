import {SignalrConfig} from '../types/signalr-config.types';

export const signalrConfig: SignalrConfig = {
  hubUrl: 'https://localhost:7000/leaderboardHub',
  heartbeatInterval: 10000,
  heartbeatTimeout: 15000,
  connectionTimeout: 12000,
  reconnectDelays: [2000, 4000, 8000] as const,
};

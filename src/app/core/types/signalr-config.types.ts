export type SignalrConfig = {
  hubUrl: string;
  heartbeatInterval: number;
  heartbeatTimeout: number;
  connectionTimeout: number;
  reconnectDelays: Array<number>;
};

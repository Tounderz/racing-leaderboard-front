import {User} from './user.types';

export type UserEventType = 'user-updated' | 'server-offline';

export interface UserEvent {
  type: UserEventType;
  data?: User;
}

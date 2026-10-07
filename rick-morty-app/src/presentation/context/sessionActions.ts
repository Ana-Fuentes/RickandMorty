import { User } from '@/domain/entities/User';

export type SessionAction =
  | {
      type: 'LOGIN_SUCCESS';
      payload: User;
    }
  | {
      type: 'LOGOUT';
    }
  | {
      type: 'LOGIN_ERROR';
      payload: string;
    };
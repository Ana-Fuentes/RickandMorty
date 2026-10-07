import { User } from '@/domain/entities/User';
import { SessionAction } from './sessionActions';

export interface SessionState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export const initialSessionState: SessionState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const sessionReducer = (
  state: SessionState,
  action: SessionAction
): SessionState => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
        error: null,
      };

    case 'LOGIN_ERROR':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: action.payload,
      };

    case 'LOGOUT':
      return {
        ...initialSessionState,
      };

    default:
      return state;
  }
};
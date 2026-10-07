import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
} from 'react';

import { User } from '@/domain/entities/User';
import { FirebaseAuthRepository } from '@/auth/FirebaseAuthRepository';

import {
  initialSessionState,
  sessionReducer,
} from './sessionReducer';

interface SessionContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const SessionContext = createContext<SessionContextType | undefined>(
  undefined
);

interface SessionProviderProps {
  children: ReactNode;
}

export const SessionProvider = ({
  children,
}: SessionProviderProps) => {
  const [state, dispatch] = useReducer(
    sessionReducer,
    initialSessionState
  );

  const authRepository = new FirebaseAuthRepository();

  const login = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const user = await authRepository.login(email, password);

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: user,
      });

      console.log('Inicio de sesión exitoso:', user.email);

      return true;
    } catch (error) {
      console.log('Error al iniciar sesión:', error);

      dispatch({
        type: 'LOGIN_ERROR',
        payload: 'Correo o contraseña incorrectos.',
      });

      return false;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await authRepository.logout();

      dispatch({
        type: 'LOGOUT',
      });

      console.log('Sesión cerrada correctamente');
    } catch (error) {
      console.log('Error al cerrar sesión:', error);
    }
  };

  return (
    <SessionContext.Provider
      value={{
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        error: state.error,
        login,
        logout,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = (): SessionContextType => {
  const context = useContext(SessionContext);

  if (!context) {
    throw new Error(
      'useSession debe utilizarse dentro de SessionProvider'
    );
  }

  return context;
};
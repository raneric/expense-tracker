import React, { createContext, useContext } from 'react';
import type { User } from '../type/AppType';

// State type
export interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

// Actions
export type UserAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' };

// Context
export const UserContext = createContext<{
  state: UserState;
  dispatch: React.Dispatch<UserAction>;
  login: () => Promise<void>;
  logout: () => void;
} | null>(null);

// Hook
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

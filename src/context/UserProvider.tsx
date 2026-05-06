import React, { useReducer } from 'react';
import type { ReactNode } from 'react';
import { fakeAuth } from '../services/auth';
import { userReducer } from './userReducer';
import { UserContext, type UserState } from './UserContext';

// Initial state
const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

// Provider
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const login = async () => {
    dispatch({ type: 'LOGIN_START' });
    try {
      const user = await fakeAuth();
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
    } catch {
      dispatch({ type: 'LOGIN_FAILURE', payload: 'Login failed' });
    }
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <UserContext.Provider value={{ state, dispatch, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

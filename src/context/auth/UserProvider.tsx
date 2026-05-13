import { useEffect, useReducer } from 'react';
import { fakeAuth } from '../../services/auth';
import type { User, UserState } from '../../type/AppType';
import type { BasePropsType } from '../../type/PropsType';
import { authReducer } from './authReducer';
import { UserContext } from './UserContext';

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

const LOCAL_STORAGE_KEY = 'expense_tracker_user';

export const UserProvider = ({ children }: BasePropsType) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const storedUser = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (storedUser) {
      const user: User = JSON.parse(storedUser);
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: user,
      });
    }
  }, []);

  const login = async () => {
    dispatch({ type: 'LOGIN_START' });
    try {
      const user = await fakeAuth();
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user));
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
    } catch {
      dispatch({ type: 'LOGIN_FAILURE', payload: 'Login failed' });
    }
  };

  const logout = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <UserContext.Provider value={{ state, dispatch, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

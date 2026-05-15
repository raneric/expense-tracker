import type { FirebaseError } from 'firebase/app';
import { useEffect, useMemo, useReducer } from 'react';
import { AuthService } from '../../services/Auth/AuthService';
import type { AuthState, LoginCredentials, User } from '../../type/AppType';
import type { BasePropsType } from '../../type/PropsType';
import { users } from '../../utils/Const';
import {
  clearStoredUser,
  getStoredUserEmail,
  storeUserEmail,
} from '../../utils/localStorageUtilities';
import { useSnackbarContext } from '../snackbar/SnackbarContext';
import { authReducer } from './authReducer';
import { UserContext } from './UserContext';
import type { AuthError } from '../../services/Auth/AuthError';
import MockAuthProvider from '../../services/Auth/MockAuthProvider';

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

export const UserProvider = ({ children }: BasePropsType) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const { show } = useSnackbarContext();
  const authService = useMemo(() => new AuthService(new MockAuthProvider()), []);

  useEffect(() => {
    const storedUser = getStoredUserEmail();
    if (storedUser) {
      const user: User = users[0];
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: user,
      });
    }
  }, []);

  const login = async (credentials: LoginCredentials) => {
    dispatch({ type: 'LOGIN_START' });

    try {
      const user = await authService.signIn(credentials);
      storeUserEmail(user.email);
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
      show('Successfully logged in', 'success');
    } catch (error: unknown) {
      dispatch({ type: 'LOGIN_FAILURE', payload: (error as AuthError).message });
      show((error as AuthError).message, 'error');
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      dispatch({ type: 'LOGOUT' });
      clearStoredUser();
    } catch (error) {
      show((error as FirebaseError).message, 'error');
    }
  };

  return (
    <UserContext.Provider value={{ state, dispatch, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

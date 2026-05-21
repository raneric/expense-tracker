import type { FirebaseError } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useMemo, useReducer } from 'react';
import type { AuthError } from '../../services/Auth/AuthError';
import AuthServiceFactory from '../../services/Auth/AuthServiceFactory';
import type { LoginCredentials, User } from '../../type/AppType';
import type { BasePropsType } from '../../type/PropsType';
import type { AuthState } from '../../type/StateContextType';
import {
  clearStoredUser,
  storeUserEmail,
} from '../../utils/localStorageUtilities';
import { useSnackbarContext } from '../snackbar/SnackbarContext';
import { authReducer } from './authReducer';
import { UserContext } from './UserContext';

const initialState: AuthState = {
  user: null,
  loading: false,
  isInit: true,
  error: null,
};

export const UserProvider = ({ children }: BasePropsType) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const { show } = useSnackbarContext();
  const authService = useMemo(() => AuthServiceFactory.createAuthService(), []);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const user: User = { email: currentUser.email!, id: currentUser.uid };
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: user,
        });
      }
    });
    return () => unsubscribe();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    dispatch({ type: 'LOGIN_START' });

    try {
      const user = await authService.signIn(credentials);
      storeUserEmail(user.email);
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
      show('Successfully logged in', 'success');
    } catch (error: unknown) {
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: (error as AuthError).message,
      });
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

import type { FirebaseError } from 'firebase/app';
import { useEffect, useReducer } from 'react';
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

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

export const UserProvider = ({ children }: BasePropsType) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const { show } = useSnackbarContext();
  const authService = AuthService.getInstance();

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

  const login = async (user: LoginCredentials) => {
    dispatch({ type: 'LOGIN_START' });

    const signInResult = await authService.signIn(user);

    if (signInResult.success && signInResult.data) {
      const user = signInResult.data;
      storeUserEmail(user.email);
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
      show('Successfully logged in', 'success');
    } else if (!signInResult.success && signInResult.errorMessage) {
      dispatch({ type: 'LOGIN_FAILURE', payload: signInResult.errorMessage });
      show(signInResult.errorMessage, 'error');
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

/**
 * User Authentication Provider Component
 *
 * Manages the global authentication state and user profile loading.
 *
 * Features:
 * - Subscribes to Firebase authentication state changes (onAuthStateChanged)
 * - Automatically initializes auth on app load
 * - Loads user profile information asynchronously after login
 * - Provides login() and logout() functions for authentication operations
 * - Handles errors with user-friendly notifications via snackbar
 *
 * Context Value Structure:
 * - state: AuthState - Contains user, profile, loading, error, and init status
 * - dispatch: Dispatch - Reducer dispatcher for advanced state management
 * - login(credentials): Promise<void> - Authenticates user with email and password
 * - logout(): Promise<void> - Logs out current user and clears local storage
 *
 * Usage:
 * ```tsx
 * import { useUserContext } from '../contexts/auth/UserContext';
 *
 * function MyComponent() {
 *   const { state, login, logout } = useUserContext();
 *   if (!state.user) return <LoginForm onSubmit={login} />;
 *   return <Dashboard user={state.user} profile={state.profile} />;
 * }
 * ```
 *
 * @component
 * @param {PropsWithChildren} props - React children to be wrapped by this provider
 * @returns {JSX.Element} Provider component wrapping children with UserContext
 *
 * @note Profile data loads asynchronously after user authentication (may cause layout shift)
 * @note Uses Firebase Auth for real-time auth state subscription
 * @note Authentication persists across page reloads via Firebase
 */
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useMemo, useReducer, type PropsWithChildren } from 'react';
import AuthProviderFactory from '../../services/Auth/AuthProviderFactory';
import type { LoginCredentials } from '../../type/AppType';
import type { AuthState } from '../../type/StateContextType';
import { getErrorMessage } from '../../utils/errorFunctions';
import { useSnackbarContext } from '../snackbar/SnackbarContext';
import { authReducer } from './authReducer';
import { UserContext } from './UserContext';
import { RepositoryRegistry } from '../../repositories/RepositoryRegistry';
import { REPOSITORY_LIST } from '../../utils/Const';

const initialState: AuthState = {
  user: null,
  profile: null,
  loading: true,
  isInit: true,
  error: null,
};

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const { show } = useSnackbarContext();
  const authProvider = useMemo(
    () => AuthProviderFactory.createAuthService(),
    []
  );

  const userInfoRepo = useMemo(
    () => RepositoryRegistry.get(REPOSITORY_LIST.UserInfo),
    []
  );

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        dispatch({
          type: 'AUTH_INITIALIZED',
          payload: {
            email: currentUser.email!,
            id: currentUser.uid,
          },
        });
      } else {
        dispatch({
          type: 'LOGOUT',
        });
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!state.user) return;

    const load = async () => {
      const userInfo = await userInfoRepo.getByUnique(state.user!.id);
      dispatch({
        type: 'LOAD_PROFILE',
        payload: userInfo,
      });
    };

    load();
  }, [state.user, userInfoRepo]);

  const login = async (credentials: LoginCredentials) => {
    dispatch({ type: 'LOGIN_START' });
    try {
      await authProvider.signIn(credentials);
      show('Successfully logged in', 'success');
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error);
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: errorMessage,
      });
      show(errorMessage, 'error');
    }
  };

  const logout = async () => {
    try {
      await authProvider.logout();
      dispatch({ type: 'LOGOUT' });
    } catch (error: unknown) {
      show(getErrorMessage(error), 'error');
    }
  };

  const reauthenticate = async (password: string): Promise<boolean> => {
    const user = state.user;

    if (!user) {
      show("User can't be null", 'error');
      return false;
    }

    dispatch({ type: 'LOGIN_START' });

    try {
      await authProvider.reauthenticate({
        email: user.email,
        password,
      });

      return true;
    } catch (error) {
      show(getErrorMessage(error), 'error');
      return false;
    } finally {
      dispatch({ type: 'LOADING_DONE' });
    }
  };

  return (
    <UserContext.Provider
      value={{ state, dispatch, login, logout, reauthenticate }}
    >
      {children}
    </UserContext.Provider>
  );
};

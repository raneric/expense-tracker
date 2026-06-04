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
import RepositoriesFactory from '../../repositories/RepositoriesFactory';
import AuthProviderFactory from '../../services/Auth/AuthProviderFactory';
import type { LoginCredentials } from '../../type/AppType';
import type { AuthState } from '../../type/StateContextType';
import { getErrorMessage } from '../../utils/errorFunctions';
import { useSnackbarContext } from '../snackbar/SnackbarContext';
import { authReducer } from './authReducer';
import { UserContext } from './UserContext';

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
    () => RepositoriesFactory.createUserInfoRepository(),
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
      const data = await userInfoRepo.getByUnique(state.user!.id);

      dispatch({
        type: 'LOAD_PROFILE',
        payload: data,
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
      const erroMessage = getErrorMessage(error);
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: erroMessage,
      });

      show(erroMessage, 'error');
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

  return (
    <UserContext.Provider value={{ state, dispatch, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

import type { AlertColor } from '@mui/material';
import type { LoginCredentials, User } from './AppType';

// ------------------ Auth Context ----------------------------
export type UserAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' };

export interface UserContextType {
  state: AuthState;
  dispatch: React.Dispatch<UserAction>;
  login: (user: LoginCredentials) => void;
  logout: () => void;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

//---------------------- Snackbar Context ------------------------
export interface SnackbarState {
  isDisplayed: boolean;
  message: string | null;
  severity: AlertColor;
}

export interface SnackbarContextType {
  state: SnackbarState;
  show: (message: string, severity: AlertColor) => void;
  hide: () => void;
}

export type SnackbarAction =
  | { type: 'OPEN'; payload: SnackbarState }
  | { type: 'CLOSED' };

//---------------------- Dialog context --------------------------
export interface DialogState {
  isOpen: boolean;
}

export interface DialogContextType {
  state: DialogState;
  show: () => void;
  hide: () => void;
}

export type DialogAction = { type: 'OPEN' } | { type: 'CLOSED' };

//---------------------- Withdrawals context -----------------------
export interface DataRetrievalState<T, U> {
  isLoading: boolean;
  data: T[];
  filter?: U;
}

export interface DataRetrievalContextType<T, U> {
  state: DataRetrievalState<T, U>;
  load: () => Promise<void>;
  filterBy: (filter: U) => Promise<void>;
}

export type DataRetrievalAction<T, U> =
  | { type: 'LOADING' }
  | { type: 'FILTER'; payload: U }
  | { type: 'LOADED'; payload: T[] }
  | { type: 'ERROR' };

export type DateFilter = { startDate?: Date; endDate?: Date };

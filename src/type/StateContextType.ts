import type { AlertColor } from '@mui/material';
import type { LoginCredentials, User } from './AppType';

// ------------------ Auth Context ----------------------------
export type UserAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'AUTH_INITIALIZED'; payload: User | null };

export interface UserContextType {
  state: AuthState;
  dispatch: React.Dispatch<UserAction>;
  login: (user: LoginCredentials) => void;
  logout: () => void;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  isInit: boolean;
  error: string | null;
}

//---------------------- Snackbar Context ------------------------
export interface SnackbarState {
  notifications: SnackbarItem[];
}

export type SnackbarItem = {
  id: string;
  message: string;
  severity: AlertColor;
};

export interface SnackbarContextType {
  state: SnackbarState;
  show: (message: string, severity: AlertColor) => void;
  hide: (id: string) => void;
}

export type SnackbarAction =
  | { type: 'PUSH'; payload: SnackbarItem }
  | { type: 'REMOVE'; payload: string };

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
  filter: U;
}

export interface DataRetrievalContextType<T, U> {
  state: DataRetrievalState<T, U>;
  load: () => Promise<void>;
  filterBy: (filter: U) => Promise<void>;
  resetFilter: () => void;
}

export type DataRetrievalAction<T, U> =
  | { type: 'LOADING' }
  | { type: 'FILTER'; payload: U }
  | { type: 'RESET_FILTER' }
  | { type: 'LOADED'; payload: T[] }
  | { type: 'ERROR' };

export type DateFilter = { startDate?: Date; endDate?: Date };

//---------------------- Drawer context -----------------------
export interface DrawerState {
  isOpen: boolean;
  width: number;
}

export interface DrawerContextType {
  state: DrawerState;
  hide: () => void;
  show: () => void;
  toggle: () => void;
}

export type DrawerAction =
  | { type: 'TOGGLE' }
  | { type: 'OPEN' }
  | { type: 'CLOSE' };

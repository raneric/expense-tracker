import type { AlertColor } from '@mui/material';
import type {
  DrawerState,
  GasEvent,
  GasFormDialogData,
  LoginCredentials,
  Saving,
  User,
  UserInfo,
  Withdrawal,
} from './AppType';

// ------------------ Auth Context ----------------------------
export type UserAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'AUTH_INITIALIZED'; payload: User | null }
  | { type: 'LOAD_PROFILE'; payload: UserInfo | null };

export interface UserContextType {
  state: AuthState;
  dispatch: React.Dispatch<UserAction>;
  login: (user: LoginCredentials) => void;
  logout: () => void;
}

export interface AuthState {
  user: User | null;
  profile: UserInfo | null;
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

export type DialogAction = { type: 'OPEN' } | { type: 'CLOSE' };

export interface DataRetrievalState<T, U = undefined> {
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

//---------------------- Withdrawals context -----------------------
export interface WithdrawalRetrievalState extends DataRetrievalState<
  Withdrawal,
  DateFilter
> {
  reasons: string[];
}

export interface WithdrawalRetrievalContextType extends DataRetrievalContextType<
  Withdrawal,
  DateFilter
> {
  state: WithdrawalRetrievalState;
  load: () => Promise<void>;
  filterBy: (filter: DateFilter) => Promise<void>;
  resetFilter: () => void;
}

export type WithdrawalRetrievalAction =
  | DataRetrievalAction<Withdrawal, DateFilter>
  | { type: 'LOAD_REASONS'; payload: string[] };

export type FilterType = 'current' | 'previous' | 'custom';

export type DateFilter = {
  startDate?: Date;
  endDate?: Date;
  type: FilterType;
};

//---------------------- Drawer context -----------------------

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

//---------------------- Gas events context -----------------------
export type GasEventsDataRetrievalState = Omit<
  DataRetrievalState<GasEvent>,
  'filter'
>;

export interface GasEventDataRetrievalContextType {
  state: GasEventsDataRetrievalState;
  load: () => Promise<void>;
  submit: (data: GasFormDialogData) => Promise<boolean>;
}

//---------------------- Saving context -----------------------
export interface SavingContextType extends DataRetrievalContextType<
  Saving,
  DateFilter | null
> {
  state: DataRetrievalState<Saving, DateFilter | null>;
}

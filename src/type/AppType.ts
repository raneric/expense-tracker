import type { AppRoutes } from '../utils/Const';
import type { GasEvent } from './PropsType';

type RoutePath = (typeof AppRoutes)[keyof typeof AppRoutes];

export type AppRoute = {
  path: RoutePath;
  name: string;
  displayName: string;
  icon?: React.ReactNode;
};

export interface Withdrawal {
  id?: string;
  reasons: string[];
  date: Date;
  amount: number;
  location: string;
  user: User;
  isForecast: boolean;
}

export interface User {
  id: string;
  email: string;
}

export type ValidatorConfig = {
  regex: RegExp;
  emptyMessage: string;
  invalidMessage: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  setValid: React.Dispatch<React.SetStateAction<boolean>>;
};

export type PrimitiveType = string | boolean | Date | number;

export interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export type UserAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' };

export interface UserContextType {
  state: UserState;
  dispatch: React.Dispatch<UserAction>;
  login: () => Promise<void>;
  logout: () => void;
}

export type GasStatusInfo = {
  previous: GasEvent;
  current: GasEvent;
  forecast: string;
  inUseDays: number;
  isOverForecast: boolean;
  gaugeText: string;
};

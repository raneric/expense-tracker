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

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface ValidatorConfig<T> {
  regex: RegExp;
  emptyMessage: string;
  invalidMessage: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  setValid: React.Dispatch<React.SetStateAction<boolean>>;
  setData: React.Dispatch<React.SetStateAction<T>>;
}

export type PrimitiveType = string | boolean | Date | number;

export type GasStatusInfo = {
  previous: GasEvent;
  current: GasEvent;
  forecast: string;
  inUseDays: number;
  isOverForecast: boolean;
  gaugeText: string;
};

export interface RequestResult<T> {
  success: boolean;
  data?: T;
  errorMessage?: string;
}

export type DialogHookState =
  | { type: 'closed' }
  | { type: 'create'; reasonsList: string[] }
  | { type: 'filter' }
  | { type: 'edit'; withdrawal: Withdrawal; reasonsList: string[] }
  | { type: 'delete'; withdrawal: Withdrawal };

export type TablePaginationState = {
  page: number;
  rowsPerPage: number;
};

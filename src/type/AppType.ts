import type { Dayjs } from 'dayjs';
import type { AppRoutes } from '../utils/Const';

type RoutePath = (typeof AppRoutes)[keyof typeof AppRoutes];

export type AppRoute = {
  path: RoutePath;
  name: string;
  displayName: string;
  icon?: React.ReactNode;
};

export interface Withdrawal {
  id?: string;
  ownerId?: string;
  email?: string;
  reasons: string[];
  date: Date;
  amount: number;
  location: string;
  isForecast: boolean;
  comments?: string;
}

export interface User {
  id: string;
  email: string;
}

export interface UserInfo extends User {
  firstName: string;
  lastName: string;
  pictureUrl: string;
}

export interface LoginCredentials extends Omit<User, 'id'> {
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

type GasEventType = 'done' | 'previous' | 'current';

export interface GasEvent {
  id: string;
  startDate: Dayjs;
  endDate: Dayjs | null;
  totalDays: number;
  type: GasEventType;
  price: number;
}

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

export interface DrawerState {
  isOpen: boolean;
  variant: 'permanent' | 'persistent' | 'temporary';
  width: number;
}

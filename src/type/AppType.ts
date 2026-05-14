import type { AlertColor } from "@mui/material";
import type { AppRoutes } from "../utils/Const";
import type { GasEvent } from "./PropsType";

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
  errorCode?: string;
}

export type UserAction =
  | { type: "LOGIN_START" }
  | { type: "LOGIN_SUCCESS"; payload: User }
  | { type: "LOGIN_FAILURE"; payload: string }
  | { type: "LOGOUT" };

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
  | { type: "OPEN"; payload: SnackbarState }
  | { type: "CLOSED" };

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

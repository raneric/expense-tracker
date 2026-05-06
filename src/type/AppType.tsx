import type { AppRoutes } from "../utils/Const";

type RoutePath = (typeof AppRoutes)[keyof typeof AppRoutes];

export type AppRoute = {
  path: RoutePath;
  name: string;
  displayName: string;
};

export type Withdraw = {
  id: string;
  reason: string;
  date: Date;
  amount: number;
  user: User;
};

export type User = {
  id: string;
  email: string;
};

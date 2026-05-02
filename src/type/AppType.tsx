import type { AppRoutes } from "../utils/Const";

type RoutePath = (typeof AppRoutes)[keyof typeof AppRoutes];

export type AppRoute = {
  path: RoutePath;
  name: string;
  displayName: string;
};

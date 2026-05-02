import type { AppRoute } from "../type/AppType";

export const AppRoutes = {
  DASHBOARD: "/dashboard",
  WITHDRAWS: "/withdraws",
  GAZ: "/gaz",
  PROFILE: "/profile",
};

export const RouteList: AppRoute[] = [
  { path: AppRoutes.DASHBOARD, name: "dashboard", displayName: "Dashboard" },
  {
    path: AppRoutes.WITHDRAWS,
    name: "withdraws",
    displayName: "Withdraw history",
  },
  { path: AppRoutes.GAZ, name: "gaz", displayName: "Gaz" },
  { path: AppRoutes.PROFILE, name: "profile", displayName: "Profile" },
];

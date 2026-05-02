import type { AppRoute } from "../type/AppType";

export const RouteList: AppRoute[] = [
  { path: "/dashboard", name: "dashboard", displayName: "Dashboard" },
  { path: "withdraws", name: "withdraws", displayName: "Withdraw history" },
  { path: "gaz", name: "gaz", displayName: "Gaz" },
  { path: "/profile", name: "profile", displayName: "Profile" },
];

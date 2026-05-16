import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../ui/layout/dashboard/Dashboard";
import Error from "../ui/components/error/Error";
import Main from "../ui/layout/Main";
import WithdrawalHistory from "../ui/layout/withdraw/WithdrawHistory";
import { AppRoutes } from "../utils/Const";
import Profile from "../ui/layout/profile/Profile";
import Login from "../ui/layout/login/Login";
import { dashboardLoader } from "./loaders/dashboardLoader";
import { withdrawalLoader } from "./loaders/withdrawalLoader";
import { action as withdrawalAction } from "./actions/withdrawalAction";
import { action as gasStatusAction } from "./actions/gasStatusAction";
import Gas from "../ui/layout/gas/Gas";
import { gasLoader } from "./loaders/gasLoader";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <Error />,
    children: [
      {
        element: <Dashboard />,
        path: "/",
      },
      {
        element: <Dashboard />,
        path: AppRoutes.DASHBOARD,
        loader: dashboardLoader,
      },
      {
        element: <WithdrawalHistory />,
        path: AppRoutes.WITHDRAWS,
        loader: withdrawalLoader,
        action: withdrawalAction,
        hydrateFallbackElement: <Error />,
      },
      {
        element: <Profile />,
        path: AppRoutes.PROFILE,
      },
      {
        element: <Gas />,
        path: AppRoutes.GAS,
        loader: gasLoader,
        action: gasStatusAction,
      },
    ],
  },
  {
    element: <Login />,
    path: AppRoutes.LOGIN,
  },
]);

export default router;

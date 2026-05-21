import { createBrowserRouter } from 'react-router-dom';
import Error from '../ui/components/error/Error';
import Dashboard from '../ui/layout/dashboard/Dashboard';
import Gas from '../ui/layout/gas/Gas';
import Login from '../ui/layout/login/Login';
import Main from '../ui/layout/Main';
import Profile from '../ui/layout/profile/Profile';
import WithdrawalHistory from '../ui/layout/withdraw/WithdrawHistory';
import { AppRoutes } from '../utils/Const';
import { action as gasStatusAction } from './actions/gasStatusAction';
import { dashboardLoader } from './loaders/dashboardLoader';
import { gasLoader } from './loaders/gasLoader';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <Error />,
    children: [
      {
        element: <Dashboard />,
        path: '/',
      },
      {
        element: <Dashboard />,
        path: AppRoutes.DASHBOARD,
        loader: dashboardLoader,
      },
      {
        element: <WithdrawalHistory />,
        path: AppRoutes.WITHDRAWS,
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

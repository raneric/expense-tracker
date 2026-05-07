import { createBrowserRouter } from 'react-router-dom';
import Dashboard from '../ui/layout/dashboard/Dashboard';
import Error from '../ui/layout/error/Error';
import Main from '../ui/layout/Main';
import WithdrawHistory from '../ui/layout/withdraw/WithdrawHistory';
import { AppRoutes } from '../utils/Const';
import Profile from '../ui/layout/profile/Profile';
import Gaz from '../ui/layout/gaz/Gaz';
import { withdrawalLoader } from '../loaders/withdrawalLoader';
import Login from '../ui/layout/login/Login';
import { dashboardLoader } from '../loaders/dashboardLoader';

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
        element: <WithdrawHistory />,
        path: AppRoutes.WITHDRAWS,
        loader: withdrawalLoader,
      },
      {
        element: <Profile />,
        path: AppRoutes.PROFILE,
      },
      {
        element: <Gaz />,
        path: AppRoutes.GAS,
      },
    ],
  },
  {
    element: <Login />,
    path: AppRoutes.LOGIN,
  },
]);

export default router;

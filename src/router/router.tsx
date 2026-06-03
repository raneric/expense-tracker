import { createBrowserRouter } from 'react-router-dom';
import Error from '../ui/features/shared/error/Error';
import Dashboard from '../ui/features/dashboard/Dashboard';
import Gas from '../ui/features/gas/Gas';
import Login from '../ui/features/login/Login';
import Main from '../ui/features/Main';
import Profile from '../ui/features/profile/Profile';
import WithdrawalHistory from '../ui/features/withdraw/WithdrawalHistory';
import { AppRoutes } from '../utils/Const';
import { dashboardLoader } from './loaders/dashboardLoader';
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
      },
    ],
  },
  {
    element: <Login />,
    path: AppRoutes.LOGIN,
  },
]);

export default router;

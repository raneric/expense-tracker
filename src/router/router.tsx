import { createBrowserRouter } from 'react-router-dom';
import Dashboard from '../ui/layout/dashboard/Dashboard';
import Error from '../ui/layout/error/Error';
import Main from '../ui/layout/Main';
import WithdrawHistory from '../ui/layout/withdraw/WithdrawHistory';
import { AppRoutes } from '../utils/Const';
import Profile from '../ui/layout/profile/Profile';
import Gaz from '../ui/layout/gaz/Gaz';
import { withdrawalLoader } from '../loaders/withdrawalLoader';

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
        path: AppRoutes.GAZ,
      },
    ],
  },
]);

export default router;

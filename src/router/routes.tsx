import { AccountBox, CalendarMonth, SyncAlt } from '@mui/icons-material';
import DashboardCustomize from '@mui/icons-material/DashboardCustomize';

import type { AppRoute } from '../type/AppType';

export const AppRoutes = {
  DASHBOARD: '/dashboard',
  WITHDRAWS: '/withdrawals',
  GAS: '/gas',
  PROFILE: '/profile',
  LOGIN: '/login',
};

export const RouteList: AppRoute[] = [
  {
    path: AppRoutes.DASHBOARD,
    name: 'dashboard',
    displayName: 'Dashboard',
    icon: <DashboardCustomize />,
  },
  {
    path: AppRoutes.WITHDRAWS,
    name: 'withdrawals',
    displayName: 'Withdrawal history',
    icon: <SyncAlt />,
  },
  {
    path: AppRoutes.GAS,
    name: 'gas',
    displayName: 'Gas',
    icon: <CalendarMonth />,
  },
  {
    path: AppRoutes.PROFILE,
    name: 'profile',
    displayName: 'Profile',
    icon: <AccountBox />,
  },
  {
    path: AppRoutes.LOGIN,
    name: 'login',
    displayName: 'Login',
  },
];

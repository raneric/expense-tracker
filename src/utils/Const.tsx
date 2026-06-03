import { AccountBox, CalendarMonth, SyncAlt } from '@mui/icons-material';
import DashboardCustomize from '@mui/icons-material/DashboardCustomize';
import type { AppRoute, GasEvent, User, Withdrawal } from '../type/AppType';
import { removeDuplicateValues } from './validationUtilities';

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

export const UserReducerActions = {
  LOGIN_START: 'LOGIN_START',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGOUT: 'LOGOUT',
};

// -------------- Temporary Fake Data ----------------------

export const initialWithdrawal: Withdrawal = {
  reasons: [],
  date: new Date(),
  amount: 0,
  location: '',
  isForecast: false,
};

export const users: User[] = [
  {
    id: 'u1',
    email: 'alice.johnson@example.com',
  },
  {
    id: 'u2',
    email: 'brian.smith@example.com',
  },
  {
    id: 'u3',
    email: 'carla.davis@example.com',
  },
];

export const rows: Withdrawal[] = [
  {
    id: '1',
    reasons: ['Food', 'Subscription'],
    date: new Date('2026-05-21'),
    location: 'New York',
    amount: 200000,
    isForecast: true,
  },
  {
    id: '2',
    reasons: ['Groceries'],
    date: new Date('2026-05-15'),
    location: 'Los Angeles',
    amount: 30000,
    isForecast: true,
  },
  {
    id: '3',
    reasons: ['Gas'],
    date: new Date('2026-05-10'),
    location: 'Chicago',
    amount: 42000,
    isForecast: true,
  },
  {
    id: '4',
    reasons: ['Medical'],
    date: new Date('2026-04-29'),
    location: 'Houston',
    amount: 315000,
    isForecast: false,
  },
  {
    id: '5',
    reasons: ['Rent'],
    date: new Date('2026-04-28'),
    location: 'San Francisco',
    amount: 13500,
    isForecast: false,
  },
  {
    id: '6',
    reasons: ['Utilities'],
    date: new Date('2026-04-27'),
    location: 'Seattle',
    amount: 100000,
    isForecast: false,
  },
  {
    id: '7',
    reasons: ['Subscription'],
    date: new Date('2026-04-26'),
    location: 'Austin',
    amount: 22000,
    isForecast: false,
  },
  {
    id: '8',
    reasons: ['Dining'],
    date: new Date('2026-04-25'),
    location: 'Miami',
    amount: 30000,
    isForecast: false,
  },
  {
    id: '9',
    reasons: ['Travel'],
    date: new Date('2026-04-24'),
    location: 'Denver',
    amount: 40000,
    isForecast: false,
  },
  {
    id: '10',
    reasons: ['Office Supplies'],
    date: new Date('2026-04-23'),
    location: 'Boston',
    amount: 63000,
    isForecast: false,
  },
  {
    id: '11',
    reasons: ['Shopping'],
    date: new Date('2026-04-22'),
    location: 'Portland',
    amount: 15000,
    isForecast: false,
  },
  {
    id: '12',
    reasons: ['Gym'],
    date: new Date('2026-04-21'),
    location: 'San Diego',
    amount: 16000,
    isForecast: false,
  },
  {
    id: '13',
    reasons: ['Insurance'],
    date: new Date('2026-04-20'),
    location: 'Philadelphia',
    amount: 17000,
    isForecast: false,
  },
  {
    id: '14',
    reasons: ['Education'],
    date: new Date('2026-04-19'),
    location: 'Atlanta',
    amount: 18000,
    isForecast: false,
  },
  {
    id: '15',
    reasons: ['Gift'],
    date: new Date('2026-04-18'),
    location: 'Dallas',
    amount: 19000,
    isForecast: false,
  },
  {
    id: '16',
    reasons: ['Home Repair'],
    date: new Date('2026-04-17'),
    location: 'Phoenix',
    amount: 20000,
    isForecast: false,
  },
  {
    id: '17',
    reasons: ['Entertainment'],
    date: new Date('2026-04-16'),
    location: 'Las Vegas',
    amount: 21000,
    isForecast: false,
  },
  {
    id: '18',
    reasons: ['Parking'],
    date: new Date('2026-04-15'),
    location: 'San Jose',
    amount: 22000,
    isForecast: false,
  },
  {
    id: '19',
    reasons: ['Pet Care'],
    date: new Date('2026-04-14'),
    location: 'Orlando',
    amount: 23000,
    isForecast: false,
  },
  {
    id: '20',
    reasons: ['Taxi'],
    date: new Date('2026-04-13'),
    location: 'Nashville',
    amount: 24000,
    isForecast: false,
  },
];

export const reasonsList: string[] = removeDuplicateValues<string>(
  rows.flatMap((row: Withdrawal) => row.reasons)
);

export const gasEventList: GasEvent[] = [
  {
    id: 'bK7xP2mQ9vL4tR8aYcNz',
    ownerId: 'bK7xP2mQ9vL4tR8aYcNz',
    startDate: new Date('2024-10-03'),
    endDate: new Date('2024-11-18'),
    totalDays: 46,
    type: 'done',
    price: 69000,
  },
  {
    id: 'Jd8Wq1XnT5uHk3LpZsVr',
    ownerId: 'bK7xP2mQ9vL4tR8aYcNz',
    startDate: new Date('2024-11-18'),
    endDate: new Date('2025-01-02'),
    totalDays: 45,
    type: 'done',
    price: 69000,
  },
  {
    id: 'Qm2Yt9BcV7pLs4XfNjKa',
    ownerId: 'bK7xP2mQ9vL4tR8aYcNz',
    startDate: new Date('2025-01-02'),
    endDate: new Date('2025-02-14'),
    totalDays: 43,
    type: 'done',
    price: 69000,
  },
  {
    id: 'Rk5Np8HdT1vYq3LmWxCs',
    ownerId: 'bK7xP2mQ9vL4tR8aYcNz',
    startDate: new Date('2025-02-14'),
    endDate: new Date('2025-03-31'),
    totalDays: 45,
    type: 'done',
    price: 69000,
  },
  {
    id: 'Vz7Xt2QmLp9Hc4NbKrDy',
    ownerId: 'bK7xP2mQ9vL4tR8aYcNz',
    startDate: new Date('2025-03-31'),
    endDate: new Date('2025-05-16'),
    totalDays: 46,
    type: 'done',
    price: 69000,
  },

  {
    id: 'Lp9Qx2HtVc7Yn4KmRdWs',
    ownerId: 'bK7xP2mQ9vL4tR8aYcNz',
    startDate: new Date('2026-03-01'),
    endDate: new Date('2026-04-15'),
    totalDays: 46,
    type: 'previous',
    price: 69000,
  },
  {
    id: 'Ht3Qm8LpVc1Yn7KxRdWs',
    ownerId: 'bK7xP2mQ9vL4tR8aYcNz',
    startDate: new Date('2026-04-15'),
    endDate: null,
    totalDays: 0,
    type: 'current',
    price: 69000,
  },
];

export const desktopOS = [
  {
    label: 'Rent',
    value: 72.72,
  },
  {
    label: 'Food',
    value: 16.38,
  },
  {
    label: 'Internet fee',
    value: 3.83,
  },
  {
    label: 'JIRAMA',
    value: 2.42,
  },
  {
    label: 'Other',
    value: 4.65,
  },
];

export const mobileOS = [
  {
    label: 'Android',
    value: 70.48,
  },
  {
    label: 'iOS',
    value: 28.8,
  },
  {
    label: 'Other',
    value: 0.71,
  },
];

export const platforms = [
  {
    label: 'Mobile',
    value: 59.12,
  },
  {
    label: 'Desktop',
    value: 40.88,
  },
];

const normalize = (v: number, v2: number) =>
  Number.parseFloat(((v * v2) / 100).toFixed(2));

export const mobileAndDesktopOS = [
  ...mobileOS.map((v) => ({
    ...v,
    label: v.label === 'Other' ? 'Other (Mobile)' : v.label,
    value: normalize(v.value, platforms[0].value),
  })),
  ...desktopOS.map((v) => ({
    ...v,
    label: v.label === 'Other' ? 'Other (Desktop)' : v.label,
    value: normalize(v.value, platforms[1].value),
  })),
];

export const valueFormatter = (item: { value: number }) => `${item.value}%`;

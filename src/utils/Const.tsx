import { AccountBox, CalendarMonth, SyncAlt } from '@mui/icons-material';
import type { AppRoute, User, Withdrawal } from '../type/AppType';
import DashboardCustomize from '@mui/icons-material/DashboardCustomize';
import { removeDuplicateValues } from './usilities';

export const AppRoutes = {
  DASHBOARD: '/dashboard',
  WITHDRAWS: '/withdraws',
  GAZ: '/gaz',
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
    name: 'withdraws',
    displayName: 'Withdraw history',
    icon: <SyncAlt />,
  },
  {
    path: AppRoutes.GAZ,
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

// -------------- Temporary Fake Data ----------------------
export const users: User[] = [
  { id: 'u1', email: 'alice.johnson@example.com' },
  { id: 'u2', email: 'brian.smith@example.com' },
  { id: 'u3', email: 'carla.davis@example.com' },
];

export const rows: Withdrawal[] = [
  {
    id: '1',
    reasons: ['Food', 'Subscription'],
    date: new Date('2026-05-02'),
    location: 'New York',
    amount: 200000,
    user: users[0],
  },
  {
    id: '2',
    reasons: ['Groceries'],
    date: new Date('2026-05-01'),
    location: 'Los Angeles',
    amount: 30000,
    user: users[1],
  },
  {
    id: '3',
    reasons: ['Gas'],
    date: new Date('2026-04-30'),
    location: 'Chicago',
    amount: 42.3,
    user: users[2],
  },
  {
    id: '4',
    reasons: ['Medical'],
    date: new Date('2026-04-29'),
    location: 'Houston',
    amount: 315.2,
    user: users[0],
  },
  {
    id: '5',
    reasons: ['Rent'],
    date: new Date('2026-04-28'),
    location: 'San Francisco',
    amount: 1350.0,
    user: users[1],
  },
  {
    id: '6',
    reasons: ['Utilities'],
    date: new Date('2026-04-27'),
    location: 'Seattle',
    amount: 98.75,
    user: users[2],
  },
  {
    id: '7',
    reasons: ['Subscription'],
    date: new Date('2026-04-26'),
    location: 'Austin',
    amount: 22.99,
    user: users[0],
  },
  {
    id: '8',
    reasons: ['Dining'],
    date: new Date('2026-04-25'),
    location: 'Miami',
    amount: 76.4,
    user: users[1],
  },
  {
    id: '9',
    reasons: ['Travel'],
    date: new Date('2026-04-24'),
    location: 'Denver',
    amount: 519.0,
    user: users[2],
  },
  {
    id: '10',
    reasons: ['Office Supplies'],
    date: new Date('2026-04-23'),
    location: 'Boston',
    amount: 63.12,
    user: users[0],
  },
  {
    id: '11',
    reasons: ['Shopping'],
    date: new Date('2026-04-22'),
    location: 'Portland',
    amount: 184.7,
    user: users[1],
  },
  {
    id: '12',
    reasons: ['Gym'],
    date: new Date('2026-04-21'),
    location: 'San Diego',
    amount: 45.0,
    user: users[2],
  },
  {
    id: '13',
    reasons: ['Insurance'],
    date: new Date('2026-04-20'),
    location: 'Philadelphia',
    amount: 212.6,
    user: users[0],
  },
  {
    id: '14',
    reasons: ['Education'],
    date: new Date('2026-04-19'),
    location: 'Atlanta',
    amount: 540.0,
    user: users[1],
  },
  {
    id: '15',
    reasons: ['Gift'],
    date: new Date('2026-04-18'),
    location: 'Dallas',
    amount: 120.0,
    user: users[2],
  },
  {
    id: '16',
    reasons: ['Home Repair'],
    date: new Date('2026-04-17'),
    location: 'Phoenix',
    amount: 287.9,
    user: users[0],
  },
  {
    id: '17',
    reasons: ['Entertainment'],
    date: new Date('2026-04-16'),
    location: 'Las Vegas',
    amount: 89.1,
    user: users[1],
  },
  {
    id: '18',
    reasons: ['Parking'],
    date: new Date('2026-04-15'),
    location: 'San Jose',
    amount: 18.0,
    user: users[2],
  },
  {
    id: '19',
    reasons: ['Pet Care'],
    date: new Date('2026-04-14'),
    location: 'Orlando',
    amount: 65.55,
    user: users[0],
  },
  {
    id: '20',
    reasons: ['Taxi'],
    date: new Date('2026-04-13'),
    location: 'Nashville',
    amount: 31.25,
    user: users[1],
  },
];

export const reasonsList: string[] = removeDuplicateValues<string>(
  rows.flatMap((row: Withdrawal) => row.reasons),
);

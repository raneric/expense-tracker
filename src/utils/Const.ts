import type { Withdrawal } from '../type/AppType';

export const UserReducerActions = {
  LOGIN_START: 'LOGIN_START',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGOUT: 'LOGOUT',
};

export const HIDDEN_AMOUNT = '** *** *** Ar';

// -------------- Temporary Fake Data ----------------------

export const initialWithdrawal: Withdrawal = {
  reasons: [],
  date: new Date(),
  amount: 0,
  location: '',
  isForecast: false,
};

export const fakePieChartData = [
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

export const valueFormatter = (item: { value: number }) => `${item.value}%`;

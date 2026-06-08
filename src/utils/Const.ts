import type { Withdrawal } from '../type/AppType';

export const UserReducerActions = {
  LOGIN_START: 'LOGIN_START',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGOUT: 'LOGOUT',
};

export const HIDDEN_AMOUNT = '** *** *** Ar';

export const REPOSITORY_LIST = {
  Withdraw: 'withdraw',
  UserInfo: 'userInfo',
  GasEvent: 'gasEvent',
  Saving: 'saving',
};

export const initialWithdrawal: Withdrawal = {
  reasons: [],
  date: new Date(),
  amount: 0,
  location: '',
  isForecast: false,
};

export const valueFormatter = (item: { value: number }) => `${item.value}%`;

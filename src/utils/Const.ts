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

export const gradientBackground = `
  radial-gradient(circle at 15% 20%, rgba(3, 169, 244, 0.35) 0%, transparent 35%),
  radial-gradient(circle at 80% 30%, rgba(38, 198, 218, 0.25) 0%, transparent 40%),
  radial-gradient(circle at 50% 90%, rgba(129, 212, 250, 0.30) 0%, transparent 45%),
  linear-gradient(145deg, #01579b 0%, #0277bd 40%, #039be5 70%, #4fc3f7 100%)
`;

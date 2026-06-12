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
  radial-gradient(
    at 15% 20%,
    rgba(3,169,244,0.35) 0px,
    transparent 45%
  ),
  radial-gradient(
    at 85% 15%,
    rgba(178,255,89,0.18) 0px,
    transparent 35%
  ),
  radial-gradient(
    at 75% 85%,
    rgba(2,136,209,0.45) 0px,
    transparent 40%
  ),
  linear-gradient(
    135deg,
    #001a2d 0%,
    #01579b 100%
  )
`;

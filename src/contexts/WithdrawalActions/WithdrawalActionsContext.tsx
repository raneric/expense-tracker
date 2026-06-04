import { createContext, useContext } from 'react';
import type { WithdrawalActionsContextType } from '../../type/StateContextType';

export const WithdrawalActionsContext =
  createContext<WithdrawalActionsContextType | null>(null);

export const useWithdrawalActions = () => {
  const context = useContext(WithdrawalActionsContext);
  if (!context) {
    throw new Error(
      'useWithdrawalActions must be used within WithdrawalActionsProvider'
    );
  }
  return context;
};

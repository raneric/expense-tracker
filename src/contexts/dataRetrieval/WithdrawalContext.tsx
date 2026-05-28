import { createContext, useContext } from 'react';
import type { WithdrawalRetrievalContextType } from '../../type/StateContextType';

export const WithdrawalContext =
  createContext<WithdrawalRetrievalContextType | null>(null);

export const useWithdrawalContext = () => {
  const context = useContext(WithdrawalContext);
  if (!context) {
    throw new Error(
      'useDataRetrievalContext must be used within a DataRetrievalProvider'
    );
  }
  return context;
};

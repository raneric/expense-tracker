import { createContext, useContext } from 'react';
import type { Withdrawal } from '../../type/AppType';
import type {
  DataRetrievalContextType,
  DateFilter,
} from '../../type/StateContextType';

export const WithdrawalContext = createContext<DataRetrievalContextType<
  Withdrawal,
  DateFilter
> | null>(null);

export const useWithdrawalContext = () => {
  const context = useContext(WithdrawalContext);
  if (!context) {
    throw new Error(
      'useDataRetrievalContext must be used within a DataRetrievalProvider'
    );
  }
  return context;
};

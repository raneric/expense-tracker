import type { WithdrawalActionsProviderType } from '../../type/StateContextType';
import { WithdrawalActionsContext } from './WithdrawalActionsContext';

export const WithdrawalActionsProvider = ({
  children,
  onEdit,
  onDelete,
  onForecastValidated,
}: WithdrawalActionsProviderType) => (
  <WithdrawalActionsContext.Provider
    value={{ onEdit, onDelete, onForecastValidated }}
  >
    {children}
  </WithdrawalActionsContext.Provider>
);

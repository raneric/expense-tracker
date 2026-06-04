import type { Withdrawal } from '../../type/AppType';
import { WithdrawalActionsContext } from './WithdrawalActionsContext';

export const WithdrawalActionsProvider = ({
  children,
  onEdit,
  onDelete,
}: {
  children: React.ReactNode;
  onEdit: (withdrawal: Withdrawal) => void;
  onDelete: (withdrawal: Withdrawal) => void;
}) => (
  <WithdrawalActionsContext.Provider value={{ onEdit, onDelete }}>
    {children}
  </WithdrawalActionsContext.Provider>
);

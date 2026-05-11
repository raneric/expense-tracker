import { useState } from 'react';
import type { Withdrawal } from '../type/AppType';

type DialogState =
  | { type: 'closed' }
  | { type: 'create' }
  | { type: 'edit'; withdrawal: Withdrawal }
  | { type: 'delete'; withdrawal: Withdrawal };

export function useWithdrawalHistory(withdrawals: Withdrawal[]) {
  const [dialog, setDialog] = useState<DialogState>({
    type: 'closed',
  });

  const currentWithdrawals = withdrawals.filter((withdraw) => !withdraw.isForecast);

  const charts = {
    current: {
      dataset: currentWithdrawals.map((withdraw) => withdraw.amount),
      dimension: currentWithdrawals.map((withdraw) => withdraw.date),
    },

    forecast: {
      dataset: withdrawals.map((withdraw) => withdraw.amount),
      dimension: withdrawals.map((withdraw) => withdraw.date),
    },
  };

  const openCreateDialog = () => {
    setDialog({ type: 'create' });
  };

  const openEditDialog = (withdrawal: Withdrawal) => {
    setDialog({ type: 'edit', withdrawal });
  };

  const openDeleteDialog = (withdrawal: Withdrawal) => {
    setDialog({ type: 'delete', withdrawal });
  };

  const closeDialog = () => {
    setDialog({ type: 'closed' });
  };

  return {
    dialog,
    charts,
    openCreateDialog,
    openEditDialog,
    openDeleteDialog,
    closeDialog,
  };
}

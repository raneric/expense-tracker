import { useState } from 'react';
import type { DialogHookState, Withdrawal } from '../type/AppType';

export function useWithdrawalHistory(withdrawals: Withdrawal[]) {
  const [dialog, setDialog] = useState<DialogHookState>({
    type: 'closed',
  });

  const currentWithdrawals = withdrawals.filter(
    (withdraw) => !withdraw.isForecast
  );

  const charts = {
    current: {
      dataset: currentWithdrawals
        .toReversed()
        .map((withdraw) => withdraw.amount),
      dimension: currentWithdrawals
        .toReversed()
        .map((withdraw) => withdraw.date),
    },

    forecast: {
      dataset: withdrawals.toReversed().map((withdraw) => withdraw.amount),
      dimension: withdrawals.toReversed().map((withdraw) => withdraw.date),
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

  const openFilterDialog = () => {
    setDialog({ type: 'filter' });
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
    openFilterDialog,
  };
}

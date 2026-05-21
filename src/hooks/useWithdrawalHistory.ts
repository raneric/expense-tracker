import { useMemo, useState } from 'react';
import type { DialogHookState, Withdrawal } from '../type/AppType';

export function useWithdrawalHistory(withdrawals: Withdrawal[]) {
  const [dialog, setDialog] = useState<DialogHookState>({
    type: 'closed',
  });

  const currentWithdrawals = useMemo(
    () => withdrawals.filter((withdraw) => !withdraw.isForecast),
    [withdrawals]
  );

  const charts = useMemo(
    () => ({
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
    }),
    [currentWithdrawals, withdrawals]
  );

  const reasonsList = useMemo(() => {
    const reasons: string[] = withdrawals
      .flatMap((value) => value.reasons)
      .filter((value) => value !== '');
    return [...new Set(reasons)];
  }, [withdrawals]);

  const openCreateDialog = () => {
    setDialog({ type: 'create', reasonsList });
  };

  const openEditDialog = (withdrawal: Withdrawal) => {
    setDialog({ type: 'edit', withdrawal, reasonsList });
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

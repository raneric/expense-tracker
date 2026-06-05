import { useMemo, useState } from 'react';
import type { DialogHookState, Withdrawal } from '../type/AppType';

/**
 * Custom hook for managing withdrawal history feature state.
 *
 * Manages dialog state (create, edit, delete, filter) and computes chart data
 * by filtering withdrawals into current (non-forecast) and all withdrawals datasets.
 * Provides handlers to open/close different dialog types for withdrawal operations.
 *
 * @param {Withdrawal[]} withdrawals - Array of withdrawal objects to manage history for
 * @returns {Object} Object containing:
 *   - {DialogHookState} dialog - Current dialog state (type and associated withdrawal if applicable)
 *   - {Object} charts - Pre-computed chart data with datasets and dimensions for current and forecast withdrawals
 *   - {Function} openCreateDialog - Opens the create withdrawal dialog
 *   - {Function} openEditDialog - Opens the edit dialog for a specific withdrawal
 *   - {Function} openDeleteDialog - Opens the delete confirmation dialog for a specific withdrawal
 *   - {Function} openFilterDialog - Opens the filter dialog
 *   - {Function} closeDialog - Closes any open dialog
 *
 * @example
 * const { dialog, charts, openCreateDialog, openEditDialog } = useWithdrawalHistory(withdrawals);
 * // Use dialog state to render appropriate dialog
 * // Use charts data for sparkline visualization
 *
 * @note Chart data is automatically reversed (most recent first) and filtered
 */
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

  const openForecastValidationDialog = (withdrawal: Withdrawal) => {
    console.log('called');
    setDialog({ type: 'forecast', withdrawal });
  };

  return {
    dialog,
    charts,
    openCreateDialog,
    openEditDialog,
    openDeleteDialog,
    closeDialog,
    openFilterDialog,
    openForecastValidationDialog,
  };
}

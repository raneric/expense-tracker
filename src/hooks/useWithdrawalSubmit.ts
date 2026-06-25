import { useCallback, useMemo, useState } from 'react';
import { useUserContext } from '../contexts/auth/UserContext';
import { useSnackbarContext } from '../contexts/snackbar/SnackbarContext';
import { useWithdrawalContext } from '../contexts/withdrawalsRetrieval/WithdrawalContext';
import { RepositoryRegistry } from '../repositories/RepositoryRegistry';
import { type Withdrawal } from '../type/AppType';
import { toLocalMgCurrency } from '../utils/formatterUtilities';
import { REPOSITORY_LIST } from '../utils/Const';
import { getErrorMessage } from '../utils/errorFunctions';

/**
 * Determines if a withdrawal is new (not yet persisted to database).
 * A withdrawal is considered new if it lacks id, ownerId, and email.
 *
 * @param {Withdrawal} withdrawal - The withdrawal object to check
 * @returns {boolean} True if withdrawal has never been persisted
 */
const isNewWithdrawal = (withdrawal: Withdrawal) =>
  !withdrawal.ownerId && !withdrawal.email && !withdrawal.id;

/**
 * Custom hook for handling withdrawal creation and update operations.
 *
 * Provides a callback function to submit (create or update) withdrawal data.
 * Automatically enriches new withdrawals with the current user's ID and email,
 * handles success/error notifications, and reloads withdrawal data after submission.
 *
 * @param {Function} closeDialog - Callback function to close the withdrawal form dialog after submission
 * @returns {Function} A memoized callback that accepts a Withdrawal object and returns a Promise<boolean>
 *   - Returns true if submission was successful
 *   - Returns false if submission failed or user is not authenticated
 *
 * @example
 * const handleSubmit = useWithdrawalSubmit(() => setDialogOpen(false));
 * const success = await handleSubmit(withdrawalData);
 * if (success) {
 *   console.log('Withdrawal saved');
 * }
 *
 * @throws Catches errors and displays them via snackbar, returns false instead of throwing
 */
export default function useWithdrawalSubmit(closeDialog: () => void) {
  const [submitInProgress, setSubmitInProgress] = useState(false);
  const { state } = useUserContext();
  const { load } = useWithdrawalContext();
  const { show } = useSnackbarContext();

  const withdrawalRepository = useMemo(
    () => RepositoryRegistry.get(REPOSITORY_LIST.Withdraw),
    []
  );

  const handleSuccess = useCallback(
    async (message: string) => {
      show(message, 'success');
      await load();
      closeDialog();
    },
    [show, load, closeDialog]
  );

  const enrichWithdrawal = useCallback(
    (withdrawal: Withdrawal): Withdrawal => {
      if (!state.user) return withdrawal;
      return {
        ...withdrawal,
        ownerId: state.user.id,
        email: state.user.email,
      };
    },
    [state.user]
  );

  const submitHandler = useCallback(
    async (withdrawal: Withdrawal) => {
      try {
        setSubmitInProgress(true);
        const isNew = isNewWithdrawal(withdrawal);
        const enrichedWithdrawal = isNew
          ? enrichWithdrawal(withdrawal)
          : withdrawal;

        if (isNew && !state.user) {
          show('User not authenticated', 'error');
          return false;
        }

        if (isNew) {
          await withdrawalRepository.createOne(enrichedWithdrawal);
          await handleSuccess('Successfully created');
        } else {
          await withdrawalRepository.updateOne(enrichedWithdrawal);
          await handleSuccess('Successfully updated');
        }
        setSubmitInProgress(false);
        return true;
      } catch (error: unknown) {
        show(getErrorMessage(error), 'error');
        setSubmitInProgress(false);
        return false;
      }
    },
    [state.user, withdrawalRepository, enrichWithdrawal, handleSuccess, show]
  );

  const validateForecast = useCallback(
    async (withdrawal: Withdrawal) => {
      try {
        setSubmitInProgress(true);
        await withdrawalRepository.updateOne({
          ...withdrawal,
          isForecast: false,
        });
        await handleSuccess(
          `Forecast with ${toLocalMgCurrency(
            withdrawal.amount
          )} on ${withdrawal.date.toDateString()} marked as done `
        );
        setSubmitInProgress(false);
        return true;
      } catch (error: unknown) {
        show(getErrorMessage(error), 'error');
        setSubmitInProgress(false);
        return false;
      }
    },
    [withdrawalRepository, handleSuccess, show]
  );

  return {
    submitHandler,
    validateForecast,
    submitInProgress,
  };
}

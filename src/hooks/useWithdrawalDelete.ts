import { useCallback, useMemo } from 'react';
import { useWithdrawalContext } from '../contexts/withdrawalsRetrieval/WithdrawalContext';
import RepositoriesFactory from '../repositories/RepositoriesFactory';
import { useSnackbarContext } from '../contexts/snackbar/SnackbarContext';

/**
 * Custom hook for handling withdrawal deletion operations.
 *
 * Provides a callback function to delete a withdrawal by ID, with automatic
 * error handling, success notifications, and data reload after deletion.
 *
 * @param {Function} closeDialog - Callback function to close the confirmation dialog after deletion
 * @returns {Function} A memoized callback function that accepts a withdrawal ID and performs the deletion
 *
 * @example
 * const handleDelete = useWithdrawalDelete(() => setDialogOpen(false));
 * // Call with withdrawal ID
 * await handleDelete('withdrawal-123');
 *
 * @throws Will catch and display errors via snackbar notification
 */
export default function useWithdrawalDelete(closeDialog: () => void) {
  const { load } = useWithdrawalContext();
  const { show } = useSnackbarContext();

  const withdrawalRepository = useMemo(
    () => RepositoriesFactory.createWithdrawRepository(),
    []
  );

  return useCallback(
    async (id: string) => {
      try {
        await withdrawalRepository.deleteByUnique(id);
        show('Successfully deleted', 'success');
        await load();
        closeDialog();
      } catch (error: unknown) {
        show((error as Error).message, 'error');
      }
    },
    [closeDialog, withdrawalRepository, load, show]
  );
}

import { useCallback, useMemo, useState } from 'react';
import { useWithdrawalContext } from '../contexts/withdrawalsRetrieval/WithdrawalContext';
import { useSnackbarContext } from '../contexts/snackbar/SnackbarContext';
import { RepositoryRegistry } from '../repositories/RepositoryRegistry';
import { REPOSITORY_LIST } from '../utils/Const';

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
  const [deletionInProgress, setDeletionInProgress] = useState(false);
  const { load } = useWithdrawalContext();
  const { show } = useSnackbarContext();

  const withdrawalRepository = useMemo(
    () => RepositoryRegistry.get(REPOSITORY_LIST.Withdraw),
    []
  );

  const onDelete = useCallback(
    async (id: string) => {
      try {
        setDeletionInProgress(true);
        await withdrawalRepository.deleteByUnique(id);
        show('Successfully deleted', 'success');
        await load();
        setDeletionInProgress(false);
        closeDialog();
      } catch (error: unknown) {
        show((error as Error).message, 'error');
        setDeletionInProgress(false);
      }
    },
    [closeDialog, withdrawalRepository, load, show]
  );
  return {
    deletionInProgress,
    onDelete,
  };
}

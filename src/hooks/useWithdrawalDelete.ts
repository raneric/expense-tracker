import { useCallback, useMemo } from 'react';
import { useWithdrawalContext } from '../contexts/dataRetrieval/WithdrawalContext';
import RepositoriesFactory from '../repositories/RepositoriesFactory';
import { useSnackbarContext } from '../contexts/snackbar/SnackbarContext';

export default function useWithdrawalDelete(closeDialog: () => void) {
  const { load } = useWithdrawalContext();
  const { show } = useSnackbarContext();

  const withdrawalRepository = useMemo(
    () => RepositoriesFactory.createWithdrawRepository(),
    []
  );

  return useCallback(
    (id: string) => {
      withdrawalRepository
        .deleteByUnique(id)
        .then(() => {
          show('Successfully deleted', 'success');
        })
        .catch((error: unknown) => {
          show((error as Error).message, 'error');
        });

      load();
      closeDialog();
    },
    [closeDialog, withdrawalRepository, load, show]
  );
}

import { useCallback, useMemo } from 'react';
import { useUserContext } from '../contexts/auth/UserContext';
import type { Withdrawal } from '../type/AppType';
import { useWithdrawalContext } from '../contexts/dataRetrieval/WithdrawalContext';
import RepositoriesFactory from '../repositories/RepositoriesFactory';
import { useSnackbarContext } from '../contexts/snackbar/SnackbarContext';

const isNewWithdrawal = (withdrawal: Withdrawal) =>
  !withdrawal.ownerId && !withdrawal.email && !withdrawal.id;

export default function useWithdrawalSubmit(closeDialog: () => void) {
  const { state } = useUserContext();
  const { load } = useWithdrawalContext();
  const { show } = useSnackbarContext();

  const withdrawalRepository = useMemo(
    () => RepositoriesFactory.createWithdrawRepository(),
    []
  );

  return useCallback(
    (withdrawal: Withdrawal) => {
      if (isNewWithdrawal(withdrawal) && state.user) {
        withdrawal.ownerId = state.user.id;
        withdrawal.email = state.user.email;
        withdrawalRepository
          .createOne(withdrawal)
          .then(() => {
            show('Successfully create', 'success');
          })
          .catch((error: unknown) => {
            show((error as Error).message, 'error');
          });
      } else {
        withdrawalRepository
          .updateOne(withdrawal)
          .then(() => {
            show('Successfully updated', 'success');
          })
          .catch((error: unknown) => {
            show((error as Error).message, 'error');
          });
      }

      load();
      closeDialog();
    },
    [state.user, closeDialog, withdrawalRepository, load, show]
  );
}

import { useCallback, useMemo } from 'react';
import { useUserContext } from '../contexts/auth/UserContext';
import WithdrawRepository from '../repositories/WithdrawRepository';
import type { Withdrawal } from '../type/AppType';
import { useWithdrawalContext } from '../contexts/dataRetrieval/WithdrawalContext';

export default function useWithdrawalSubmit(closeDialog: () => void) {
  const { state } = useUserContext();
  const { load } = useWithdrawalContext();
  const withdrawalRepository = useMemo(() => new WithdrawRepository(), []);

  return useCallback(
    (withdrawal: Withdrawal) => {
      if (withdrawal.user === null && state.user && !withdrawal.id) {
        withdrawal.user = state.user;
        withdrawalRepository.createOne(withdrawal);
      } else if (withdrawal.user && withdrawal.id) {
        withdrawalRepository.updateOne(withdrawal);
      }

      load();
      closeDialog();
    },
    [state.user, closeDialog, withdrawalRepository, load]
  );
}

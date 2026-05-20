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
      if (state.user) {
        withdrawal.user = state.user;
      }
      withdrawalRepository.createOne(withdrawal);
      load();
      closeDialog();
    },
    [state.user, closeDialog, withdrawalRepository, load]
  );
}

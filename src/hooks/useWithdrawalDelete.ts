import { useCallback, useMemo } from 'react';
import { useWithdrawalContext } from '../contexts/dataRetrieval/WithdrawalContext';
import WithdrawRepository from '../repositories/WithdrawRepository';

export default function useWithdrawalDelete(closeDialog: () => void) {
  const { load } = useWithdrawalContext();
  const withdrawalRepository = useMemo(() => new WithdrawRepository(), []);

  return useCallback(
    (id: string) => {
      withdrawalRepository.deleteByUnique(id);
      load();
      closeDialog();
    },
    [closeDialog, withdrawalRepository, load]
  );
}

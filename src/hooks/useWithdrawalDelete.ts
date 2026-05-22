import { useCallback, useMemo } from 'react';
import { useWithdrawalContext } from '../contexts/dataRetrieval/WithdrawalContext';
import RepositoriesFactory from '../repositories/RepositoriesFactory';

export default function useWithdrawalDelete(closeDialog: () => void) {
  const { load } = useWithdrawalContext();
  const withdrawalRepository = useMemo(
    () => RepositoriesFactory.createWithdrawRepository(),
    []
  );

  return useCallback(
    (id: string) => {
      withdrawalRepository.deleteByUnique(id);
      load();
      closeDialog();
    },
    [closeDialog, withdrawalRepository, load]
  );
}

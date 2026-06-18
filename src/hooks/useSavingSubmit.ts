import { useCallback, useMemo, useState } from 'react';
import { RepositoryRegistry } from '../repositories/RepositoryRegistry';
import { REPOSITORY_LIST } from '../utils/Const';
import { useUserContext } from '../contexts/auth/UserContext';
import type { Saving } from '../type/AppType';
import { useSnackbarContext } from '../contexts/snackbar/SnackbarContext';
import { getErrorMessage } from '../utils/errorFunctions';

export default function useSavingSubmit() {
  const [submitInProgress, setSubmitInProgress] = useState(false);
  const { state: userState } = useUserContext();
  const { show } = useSnackbarContext();
  const repository = useMemo(
    () => RepositoryRegistry.get(REPOSITORY_LIST.Saving),
    []
  );

  const createSaving = useCallback(
    async (savingData: Partial<Saving>) => {
      setSubmitInProgress(true);
      if (!userState.user) {
        show('User not authenticated', 'error');
        return false;
      } else {
        const saving: Saving = {
          amount: savingData.amount!,
          month: savingData.month!,
          ownerId: userState.user?.id,
        };
        try {
          await repository.createOne(saving);
          return true;
        } catch (error: unknown) {
          show(getErrorMessage(error), 'error');
          return false;
        } finally {
          setSubmitInProgress(false);
        }
      }
    },
    [repository, userState, show]
  );

  return {
    createSaving,
    submitInProgress,
  };
}

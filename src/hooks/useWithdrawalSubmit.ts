import { useSubmit } from 'react-router-dom';
import { useUserContext } from '../contexts/auth/UserContext';
import { useCallback } from 'react';
import type { Withdrawal } from '../type/AppType';

export default function useWithdrawalSubmit(closeDialog: () => void) {
  const submit = useSubmit();
  const { state } = useUserContext();

  return useCallback(
    (withdrawal: Withdrawal) => {
      const formData = new FormData();

      Object.entries(withdrawal).forEach(([key, value]) => {
        formData.append(key, String(value));
      });

      if (state.user) {
        formData.append('user', JSON.stringify(state.user));
      }

      submit(formData, {
        method: 'post',
        action: '/withdrawals',
      });

      closeDialog();
    },
    [submit, state.user, closeDialog]
  );
}

import { act, renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import useWithdrawalDelete from '../../hooks/useWithdrawalDelete';

const { deleteByUnique, load, show } = vi.hoisted(() => ({
  deleteByUnique: vi.fn(),
  load: vi.fn(),
  show: vi.fn(),
}));

vi.mock('../../contexts/withdrawalsRetrieval/WithdrawalContext', () => ({
  useWithdrawalContext: () => ({ load }),
}));

vi.mock('../../contexts/snackbar/SnackbarContext', () => ({
  useSnackbarContext: () => ({ show }),
}));

vi.mock('../../repositories/RepositoriesFactory', () => ({
  default: {
    createWithdrawRepository: () => ({
      deleteByUnique,
    }),
  },
}));

describe('useWithdrawalDelete', () => {
  beforeEach(() => {
    deleteByUnique.mockReset();
    deleteByUnique.mockResolvedValue(undefined);
    load.mockReset();
    show.mockReset();
  });

  it('deletes a withdrawal and reloads data after success', async () => {
    const closeDialog = vi.fn();

    const { result } = renderHook(() => useWithdrawalDelete(closeDialog));

    await act(async () => {
      await result.current.onDelete('withdrawal-1');
    });

    await waitFor(() => {
      expect(deleteByUnique).toHaveBeenCalledWith('withdrawal-1');
    });

    expect(show).toHaveBeenCalledWith('Successfully deleted', 'success');
    expect(load).toHaveBeenCalledTimes(1);
    expect(closeDialog).toHaveBeenCalledTimes(1);
  });
});

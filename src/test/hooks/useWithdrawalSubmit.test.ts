import { act, renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import useWithdrawalSubmit from '../../hooks/useWithdrawalSubmit';
import type { User } from '../../type/AppType';

const { createOne, updateOne, load, show, user } = vi.hoisted(() => ({
  createOne: vi.fn(),
  updateOne: vi.fn(),
  load: vi.fn(),
  show: vi.fn(),
  user: {
    current: { id: 'user-1', email: 'user@example.com' } as User | null,
  },
}));

vi.mock('../../contexts/auth/UserContext', () => ({
  useUserContext: () => ({ state: { user: user.current } }),
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
      createOne,
      updateOne,
    }),
  },
}));

describe('useWithdrawalSubmit', () => {
  beforeEach(() => {
    user.current = { id: 'user-1', email: 'user@example.com' };
    createOne.mockReset();
    updateOne.mockReset();
    load.mockReset();
    show.mockReset();
    createOne.mockResolvedValue(undefined);
    updateOne.mockResolvedValue(undefined);
    load.mockResolvedValue(undefined);
  });

  it('creates a new withdrawal, enriches it with the current user, and reloads data after success', async () => {
    const closeDialog = vi.fn();
    const { result } = renderHook(() => useWithdrawalSubmit(closeDialog));

    const withdrawal = {
      reasons: ['Groceries'],
      date: new Date('2026-06-01'),
      amount: 45.5,
      location: 'Market',
      isForecast: false,
    };

    let success = false;

    await act(async () => {
      success = await result.current.submitHandler(withdrawal);
    });

    await waitFor(() => {
      expect(createOne).toHaveBeenCalledWith(
        expect.objectContaining({
          ...withdrawal,
          ownerId: user.current?.id,
          email: user.current?.email,
        })
      );
    });

    expect(success).toBe(true);
    expect(show).toHaveBeenCalledWith('Successfully created', 'success');
    expect(load).toHaveBeenCalledTimes(1);
    expect(closeDialog).toHaveBeenCalledTimes(1);
    expect(result.current.submitInProgress).toBe(false);
  });

  it('updates an existing withdrawal without re-enriching the user fields', async () => {
    const closeDialog = vi.fn();
    const { result } = renderHook(() => useWithdrawalSubmit(closeDialog));

    const withdrawal = {
      id: 'withdrawal-1',
      ownerId: 'user-1',
      email: 'user@example.com',
      reasons: ['Travel'],
      date: new Date('2026-06-02'),
      amount: 120,
      location: 'Train',
      isForecast: false,
    };

    let success = false;

    await act(async () => {
      success = await result.current.submitHandler(withdrawal);
    });

    await waitFor(() => {
      expect(updateOne).toHaveBeenCalledWith(withdrawal);
    });

    expect(success).toBe(true);
    expect(createOne).not.toHaveBeenCalled();
    expect(show).toHaveBeenCalledWith('Successfully updated', 'success');
    expect(load).toHaveBeenCalledTimes(1);
    expect(closeDialog).toHaveBeenCalledTimes(1);
  });

  it('returns false and shows an error when the user is not authenticated for a new withdrawal', async () => {
    const closeDialog = vi.fn();
    user.current = null;

    const { result } = renderHook(() => useWithdrawalSubmit(closeDialog));

    const withdrawal = {
      reasons: ['Food'],
      date: new Date('2026-06-03'),
      amount: 10,
      location: 'Cafe',
      isForecast: false,
    };

    let success = false;

    await act(async () => {
      success = await result.current.submitHandler(withdrawal);
    });

    expect(success).toBe(false);
    expect(show).toHaveBeenCalledWith('User not authenticated', 'error');
    expect(createOne).not.toHaveBeenCalled();
    expect(closeDialog).not.toHaveBeenCalled();
  });

  it('shows an error message when the repository call fails', async () => {
    createOne.mockRejectedValueOnce(new Error('Create failed'));

    const closeDialog = vi.fn();
    const { result } = renderHook(() => useWithdrawalSubmit(closeDialog));

    const withdrawal = {
      reasons: ['Bills'],
      date: new Date('2026-06-04'),
      amount: 30,
      location: 'Utility',
      isForecast: false,
    };

    let success = false;

    await act(async () => {
      success = await result.current.submitHandler(withdrawal);
    });

    expect(success).toBe(false);
    expect(show).toHaveBeenCalledWith('Create failed', 'error');
    expect(closeDialog).not.toHaveBeenCalled();
  });
});

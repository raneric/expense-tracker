import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import WithdrawalFormDialog from '../../ui/features/withdraw/components/Dialog/WithdrawalFormDialog';

const baseWithdrawal = {
  reasons: ['Food'],
  date: new Date('2026-06-10'),
  amount: 25,
  location: 'Market',
  comments: 'Weekly groceries',
  isForecast: false,
};

describe('WithdrawalFormDialog', () => {
  it('renders existing withdrawal data and submits the current form values', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn().mockResolvedValue(true);

    render(
      <WithdrawalFormDialog
        isOpen
        onClose={vi.fn()}
        onSubmit={onSubmit}
        initialData={baseWithdrawal}
        reasonsList={['Food', 'Travel']}
        submitInProgress={false}
      />
    );

    expect(screen.getByText('Withdrawal info')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Market')).toBeInTheDocument();
    expect(screen.getByDisplayValue('25')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Weekly groceries')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /submit/i }));

    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        reasons: ['Food'],
        amount: 25,
        location: 'Market',
        comments: 'Weekly groceries',
      })
    );
  });

  it('shows validation feedback and disables submit when the form has invalid values', () => {
    render(
      <WithdrawalFormDialog
        isOpen
        onClose={vi.fn()}
        onSubmit={vi.fn()}
        initialData={{
          ...baseWithdrawal,
          reasons: [],
          amount: -5,
        }}
        reasonsList={['Food', 'Travel']}
        submitInProgress={false}
      />
    );

    expect(
      screen.getByText('At least one reason is required')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Amount must be greater or equal to 0')
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeDisabled();
  });

  it('shows the forecast chip when the withdrawal is marked as forecast', () => {
    render(
      <WithdrawalFormDialog
        isOpen
        onClose={vi.fn()}
        onSubmit={vi.fn()}
        initialData={{
          ...baseWithdrawal,
          isForecast: true,
        }}
        reasonsList={['Food', 'Travel']}
        submitInProgress={false}
      />
    );

    expect(screen.getByText('🕑 Forecast')).toBeVisible();
  });

  it('shows forecast chip when selecting a future date', async () => {
    const user = userEvent.setup();

    render(
      <WithdrawalFormDialog
        isOpen
        onClose={vi.fn()}
        onSubmit={vi.fn()}
        initialData={{
          ...baseWithdrawal,
          isForecast: false,
        }}
        reasonsList={['Food', 'Travel']}
        submitInProgress={false}
      />
    );

    expect(screen.queryByText('🕑 Forecast')).not.toBeVisible();

    const dateInput = screen.getByLabelText(/date/i);

    await user.clear(dateInput);
    await user.type(dateInput, '2099-12-31');

    expect(screen.getByText('🕑 Forecast')).toBeVisible();
  });
});

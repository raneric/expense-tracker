import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import ConfirmationDialog from '../../ui/features/shared/Dialog/ConfirmationDialog';

describe('ConfirmationDialog', () => {
  it('renders the confirmation message and calls the handlers when buttons are clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    const onConfirm = vi.fn();
    const onCancel = vi.fn();

    render(
      <ConfirmationDialog
        isOpen
        onClose={onClose}
        onConfirm={onConfirm}
        onCancel={onCancel}
        message="Delete this withdrawal?"
        isConfirmationInProgress={false}
      />
    );

    expect(screen.getByText('Delete this withdrawal?')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /cancel/i }));
    expect(onCancel).toHaveBeenCalledTimes(1);

    await user.click(screen.getByRole('button', { name: /confirm/i }));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it('shows the confirm button in loading state when deletion is in progress', () => {
    render(
      <ConfirmationDialog
        isOpen
        onClose={vi.fn()}
        onConfirm={vi.fn()}
        onCancel={vi.fn()}
        message="Delete this withdrawal?"
        isConfirmationInProgress={true}
      />
    );

    const confirmButton = screen.getByRole('button', { name: /confirm/i });

    expect(confirmButton).toBeDisabled();
  });
});

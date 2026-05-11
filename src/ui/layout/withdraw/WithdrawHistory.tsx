import { AccountBalanceWallet } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import { Card, Fab, Stack } from '@mui/material';
import { useCallback, useMemo, useState } from 'react';
import WithdrawTable from '../../components/Table/WithdrawTable';
import ExpenseSparkLine from '../../components/charts/ExpenseSparkline';
import AddWithdrawForm from '../../components/forms/AddWithdrawForm';
import { SectionTitle, Tittle, TittleHelperInfo } from '../../core/SectionTitle';
import { useLoaderData } from 'react-router-dom';
import type { Withdrawal } from '../../../type/AppType';
import { initialWithdrawal } from '../../../utils/Const';
import ConfirmationDialog from '../../components/FeedbackDialog/ConfirmationDialog';
import { toLocalMgCurrency } from '../../../utils/utilities';

/**
 * The WithdrawalHistory component is responsible for displaying the user's withdrawal history. It includes a section title, two sparkline charts (one for current withdrawals and one for forecasted withdrawals), a table of withdrawal transactions, and a form dialog for adding or editing withdrawals. The component uses the useLoaderData hook to fetch withdrawal data and manages the state for the form dialog and selected withdrawal row.
 * @returns A React component that renders the withdrawal history section of the application.
 */
export default function WithdrawalHistory() {
  const withdrawals = useLoaderData() as Withdrawal[];

  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [selectedWithdrawal, setSelectedWithdrawal] = useState<Withdrawal>(initialWithdrawal);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [confirmDeleteMessage, setConfirmDeleteMessage] = useState('');
  const [withdrawalToDelete, setWithdrawalToDelete] = useState<Withdrawal | null>(null);
  /**
   * Memoized chart datasets
   * Prevents recalculation on every render
   */
  const { forecastDataset, forecastDimension, currentDataset, currentDimension } = useMemo(() => {
    const currentRows = withdrawals.filter(({ isForecast }) => !isForecast);

    return {
      forecastDataset: withdrawals.map(({ amount }) => amount),
      forecastDimension: withdrawals.map(({ date }) => date),

      currentDataset: currentRows.map(({ amount }) => amount),
      currentDimension: currentRows.map(({ date }) => date),
    };
  }, [withdrawals]);

  const handleFormDialogOpen = useCallback(() => {
    setIsFormDialogOpen(true);
  }, []);

  const handleFormDialogClose = useCallback(() => {
    setIsFormDialogOpen(false);
  }, []);

  const handleFormDataChange = useCallback((data: Withdrawal) => {
    setSelectedWithdrawal(data);
  }, []);

  const handleConfirmDialog = useCallback(() => {
    setIsDeleteDialogOpen(false);
    console.log(withdrawalToDelete);
    setWithdrawalToDelete(null);
  }, [withdrawalToDelete]);

  const handleRowEditClick = useCallback((withdrawal: Withdrawal) => {
    setSelectedWithdrawal(withdrawal);
    setIsFormDialogOpen(true);
  }, []);

  const handleRowDeleteClick = useCallback((withdrawal: Withdrawal) => {
    setWithdrawalToDelete(withdrawal);
    setConfirmDeleteMessage(
      `Are you sure you want to delete the withdrawal of ${toLocalMgCurrency(withdrawal.amount)} on ${withdrawal.date.toDateString()}?`,
    );
    setIsDeleteDialogOpen(true);
  }, []);

  const handleDeleteCancel = useCallback(() => {
    setIsDeleteDialogOpen(false);
    setWithdrawalToDelete(null);
  }, []);

  const chartCardSx = useMemo(
    () => ({
      px: 2,
      py: 1,
      borderRadius: '0.6em',
    }),
    [],
  );

  return (
    <Stack spacing={2}>
      <SectionTitle>
        <Tittle displayText='Withdrawal Activity' icon={<AccountBalanceWallet />} />
        <TittleHelperInfo displayText='Track your recent transactions' />
      </SectionTitle>

      <Stack direction='row' spacing={2}>
        <Card sx={chartCardSx}>
          <ExpenseSparkLine
            dimension={currentDimension}
            dataset={currentDataset}
            dataLabel='Withdrawal off today'
          />
        </Card>

        <Card sx={chartCardSx}>
          <ExpenseSparkLine
            dimension={forecastDimension}
            dataset={forecastDataset}
            dataLabel='Forecasted'
          />
        </Card>
      </Stack>

      <WithdrawTable
        withdrawals={withdrawals}
        onRowEditClick={handleRowEditClick}
        onRowDeleteClick={handleRowDeleteClick}
      />

      <AddWithdrawForm
        formData={selectedWithdrawal}
        isOpen={isFormDialogOpen}
        onClose={handleFormDialogClose}
        onInputDataChange={handleFormDataChange}
      />

      <Fab
        color='secondary'
        aria-label='add withdraw'
        onClick={handleFormDialogOpen}
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
        }}
      >
        <AddIcon />
      </Fab>
      <ConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        message={confirmDeleteMessage}
        onConfirm={handleConfirmDialog}
        onCancel={handleDeleteCancel}
      />
    </Stack>
  );
}

import { AccountBalanceWallet } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import { Fab, Stack } from '@mui/material';
import { useState } from 'react';
import WithdrawTable from '../../components/Table/WithdrawTable';
import ExpenseSparkLine from '../../components/charts/ExpenseSparkline';
import AddWithdrawForm from '../../components/forms/AddWithdrawForm';
import { SectionTitle, Tittle, TittleHelperInfo } from '../../core/SectionTitle';
import { useLoaderData } from 'react-router-dom';
import type { Withdrawal } from '../../../type/AppType';
import { initialWithdrawal } from '../../../utils/Const';

/**
 * The WithdrawalHistory component is responsible for displaying the user's withdrawal history. It includes a section title, two sparkline charts (one for current withdrawals and one for forecasted withdrawals), a table of withdrawal transactions, and a form dialog for adding or editing withdrawals. The component uses the useLoaderData hook to fetch withdrawal data and manages the state for the form dialog and selected withdrawal row.
 * @returns A React component that renders the withdrawal history section of the application.
 */
export default function WithdrawalHistory() {
  const withdrawalData = useLoaderData();

  const datasetWithForecast = withdrawalData.map((row: Withdrawal) => row.amount);
  const dimensionWithForecast = withdrawalData.map((row: Withdrawal) => row.date);

  const rowsOffToday = withdrawalData.filter((row: Withdrawal) => !row.isForecast);
  const currentDataset = rowsOffToday.map((filteredRow: Withdrawal) => filteredRow.amount);
  const currentDimension = rowsOffToday.map((row: Withdrawal) => row.date);

  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<Withdrawal>(initialWithdrawal);

  const handleFormDialogOpen = () => setIsFormDialogOpen(true);
  const handleFormDialogClose = () => setIsFormDialogOpen(false);

  const handleRowEditClick = (withdrawal: Withdrawal) => {
    setSelectedRow(withdrawal);
    setIsFormDialogOpen(true);
  };

  const handleRowDeleteClick = (id: string) => {
    console.log(id);
  };

  const handleFormDataChange = (data: Withdrawal) => {
    setSelectedRow(data);
  };

  return (
    <Stack spacing={2}>
      <SectionTitle>
        <Tittle displayText='Withdrawal Activity' icon={<AccountBalanceWallet />} />
        <TittleHelperInfo displayText=' Track your recent transactions' />
      </SectionTitle>
      <Stack spacing={2} direction='row'>
        <ExpenseSparkLine
          dimension={currentDimension}
          dataLabel='Withdrawal off today'
          dataset={currentDataset}
        />
        <ExpenseSparkLine
          dimension={dimensionWithForecast}
          dataLabel='Forecasted'
          dataset={datasetWithForecast}
        />
      </Stack>

      <WithdrawTable
        withdrawals={withdrawalData}
        onRowEditClick={handleRowEditClick}
        onRowDeleteClick={handleRowDeleteClick}
      />
      <AddWithdrawForm
        formData={selectedRow}
        isOpen={isFormDialogOpen}
        onClose={handleFormDialogClose}
        onInputDataChange={handleFormDataChange}
      />
      <Fab
        color='secondary'
        aria-label='add withdraw'
        onClick={handleFormDialogOpen}
        sx={{ position: 'fixed', bottom: 24, right: 24 }}
      >
        <AddIcon />
      </Fab>
    </Stack>
  );
}

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
export default function WithdrawalHistory() {
  const withdrawalData = useLoaderData();

  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleCLose = () => setIsOpen(false);

  const datasetWithForecast = withdrawalData.map((row: Withdrawal) => row.amount);
  const dimensionWithForecast = withdrawalData.map((row: Withdrawal) => row.date);

  const rowsOffToday = withdrawalData.filter((row: Withdrawal) => !row.isForecast);
  const currentDataset = rowsOffToday.map((filteredRow: Withdrawal) => filteredRow.amount);
  const currentDimension = rowsOffToday.map((row: Withdrawal) => row.date);

  return (
    <Stack spacing={2}>
      <SectionTitle>
        <Tittle displayText='Withdrawal Activity' icon={<AccountBalanceWallet />} />
        <TittleHelperInfo displayText=' Track your recent transactions and spending patterns' />
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

      <WithdrawTable withdrawals={withdrawalData} />
      <AddWithdrawForm isOpen={isOpen} onClose={handleCLose} />
      <Fab
        color='secondary'
        aria-label='add withdraw'
        onClick={handleOpen}
        sx={{ position: 'fixed', bottom: 24, right: 24 }}
      >
        <AddIcon />
      </Fab>
    </Stack>
  );
}

import { AccountBalanceWallet, FilterList } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import {
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Stack,
} from '@mui/material';
import { useMemo, useState } from 'react';
import { useSubmit } from 'react-router-dom';
import { useUserContext } from '../../../contexts/auth/UserContext';
import { useWithdrawalContext } from '../../../contexts/dataRetrieval/WithdrawalContext';
import { useWithdrawalHistory } from '../../../hooks/useWithdrawalHistory';
import type { TablePaginationState, Withdrawal } from '../../../type/AppType';
import { initialWithdrawal } from '../../../utils/Const';
import { toLocalMgCurrency } from '../../../utils/formatterUtilities';
import { WithdrawalCharts } from '../../components/Charts/WithdrawalCharts';
import FilterDialog from '../../components/Dialog/FilterDialog';
import WithdrawalFormDialog from '../../components/Dialog/WithdrawalFormDialog';
import ConfirmationDialog from '../../components/FeedbackDialog/ConfirmationDialog';
import WithdrawTable from '../../components/Table/WithdrawTable';
import WithdrawTableBody from '../../components/Table/WithdrawTableBody';
import WithdrawTableHeader from '../../components/Table/WithdrawTableHeader';
import {
  SectionTitle,
  Tittle,
  TittleHelperInfo,
} from '../../core/SectionTitle';

const defaultPaginationState: TablePaginationState = {
  page: 0,
  rowsPerPage: 5,
};

/**
 * The WithdrawalHistory component is responsible for displaying the user's withdrawal history. It includes a section title, two sparkline charts (one for current withdrawals and one for forecasted withdrawals), a table of withdrawal transactions, and a form dialog for adding or editing withdrawals. The component uses the useLoaderData hook to fetch withdrawal data and manages the state for the form dialog and selected withdrawal row.
 * @returns A React component that renders the withdrawal history section of the application.
 */
export default function WithdrawalHistory() {
  const { state: withdrawalState } = useWithdrawalContext();
  const { state } = useUserContext();
  const submit = useSubmit();
  const {
    dialog,
    charts,
    openCreateDialog,
    openEditDialog,
    openDeleteDialog,
    closeDialog,
    openFilterDialog,
  } = useWithdrawalHistory(withdrawalState.data);

  const [paginationState, setPaginationState] = useState<TablePaginationState>(
    defaultPaginationState
  );
  const { page, rowsPerPage } = paginationState;
  const isFormDialogOpen = dialog.type === 'create' || dialog.type === 'edit';
  const formInitialData =
    dialog.type === 'edit' ? dialog.withdrawal : initialWithdrawal;

  const currentPage = useMemo(
    () =>
      withdrawalState.data.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [page, rowsPerPage, withdrawalState.data]
  );

  const handleUpdateSubmit = (withdrawal: Withdrawal) => {
    const formData = new FormData();

    for (const [key, value] of Object.entries(withdrawal)) {
      formData.append(key, String(value));
    }
    if (state.user) {
      formData.append('user', JSON.stringify(state.user));
    }
    submit(formData, { method: 'post', action: '/withdrawals' });
    closeDialog();
  };

  const handlePageChange = (_event: unknown, newPage: number) => {
    setPaginationState((pagination) => ({ ...pagination, page: newPage }));
  };

  const handleRowPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPaginationState(() => ({
      rowsPerPage: parseInt(event.target.value, 10),
      page: 0,
    }));
  };

  // REFACTOR THIS SHIT. IT IS AT THE WRONG PLACE
  const speedDialAction = [
    { icon: <AddIcon />, name: 'Add', action: openCreateDialog },
    { icon: <FilterList />, name: 'Filter', action: openFilterDialog },
  ];

  return (
    <Stack spacing={2}>
      <SectionTitle>
        <Tittle
          displayText="Withdrawal Activity"
          icon={<AccountBalanceWallet />}
        />
        <TittleHelperInfo displayText="Track your recent transactions" />
      </SectionTitle>

      <WithdrawalCharts
        current={charts.current}
        forecast={charts.forecast}
      />

      <WithdrawTable
        tablePaginationState={paginationState}
        onPageChange={handlePageChange}
        onRowPerPageChange={handleRowPerPageChange}
      >
        <WithdrawTableHeader />
        <WithdrawTableBody
          withdrawals={currentPage}
          onRowDeleteClick={openDeleteDialog}
          onRowEditClick={openEditDialog}
        />
      </WithdrawTable>

      <WithdrawalFormDialog
        key={dialog.type === 'edit' ? `edit-${dialog.withdrawal.id}` : 'create'}
        isOpen={isFormDialogOpen}
        initialData={formInitialData}
        onClose={closeDialog}
        onSubmit={handleUpdateSubmit}
      />

      <FilterDialog
        isOpen={dialog.type === 'filter'}
        onClose={closeDialog}
      />

      <ConfirmationDialog
        isOpen={dialog.type === 'delete'}
        onClose={closeDialog}
        onCancel={closeDialog}
        onConfirm={() => {
          if (dialog.type === 'delete') {
            handleUpdateSubmit(dialog.withdrawal);
          }
        }}
        message={
          dialog.type === 'delete'
            ? `Delete withdrawal of ${toLocalMgCurrency(
                dialog.withdrawal.amount
              )} on ${dialog.withdrawal.date.toDateString()}?`
            : ''
        }
      />

      <SpeedDial
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
        }}
        ariaLabel="SpeedDial tooltip example"
        icon={<SpeedDialIcon />}
      >
        {speedDialAction.map((dialAction) => (
          <SpeedDialAction
            key={dialAction.name}
            icon={dialAction.icon}
            slotProps={{
              tooltip: {
                title: dialAction.name,
              },
            }}
            onClick={dialAction.action}
          />
        ))}
      </SpeedDial>
    </Stack>
  );
}

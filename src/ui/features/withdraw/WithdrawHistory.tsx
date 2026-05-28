import { AccountBalanceWallet, FilterList } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import { Stack } from '@mui/material';
import { useWithdrawalContext } from '../../../contexts/dataRetrieval/WithdrawalContext';
import { useWithdrawalHistory } from '../../../hooks/useWithdrawalHistory';
import useWithdrawalPagination from '../../../hooks/useWithdrawalPagination';
import useWithdrawalSubmit from '../../../hooks/useWithdrawalSubmit';
import type { SpeedDialActionElement } from '../../../type/PropsType';
import { initialWithdrawal } from '../../../utils/Const';
import { toLocalMgCurrency } from '../../../utils/formatterUtilities';
import AppSpeedDial from '../shared/SpeedDial/AppSpeedDial';
import WithdrawTable from './components/Table/WithdrawTable';
import WithdrawTableBody from './components/Table/WithdrawTableBody';
import WithdrawTableHeader from './components/Table/WithdrawTableHeader';

import useWithdrawalDelete from '../../../hooks/useWithdrawalDelete';
import {
  SectionTitle,
  Tittle,
  TittleHelperInfo,
} from '../shared/SectionTitle/SectionTitle';
import SkeletonTableBody from '../shared/Table/SkeletonTableBody';
import { WithdrawalCharts } from './components/Chart/WithdrawalCharts';
import WithdrawalFormDialog from './components/Dialog/WithdrawalFormDialog';
import ConfirmationDialog from '../shared/Dialog/ConfirmationDialog';
import FilterDialog from './components/Dialog/FilterDialog';

/**
 * The WithdrawalHistory component is responsible for displaying the user's withdrawal history. It includes a section title, two sparkline charts (one for current withdrawals and one for forecasted withdrawals), a table of withdrawal transactions, and a form dialog for adding or editing withdrawals. The component uses the useLoaderData hook to fetch withdrawal data and manages the state for the form dialog and selected withdrawal row.
 * @returns A React component that renders the withdrawal history section of the application.
 */
export default function WithdrawalHistory() {
  const { state: withdrawalState } = useWithdrawalContext();

  const {
    dialog,
    charts,
    openCreateDialog,
    openEditDialog,
    openDeleteDialog,
    closeDialog,
    openFilterDialog,
  } = useWithdrawalHistory(withdrawalState.data);

  const handleUpdateSubmit = useWithdrawalSubmit(closeDialog);

  const handleDelete = useWithdrawalDelete(closeDialog);

  const { pagination, currentPage, onPageChange, onRowsPerPageChange } =
    useWithdrawalPagination(withdrawalState.data);

  const speedDialAction: SpeedDialActionElement[] = [
    { icon: <AddIcon />, name: 'Add', action: openCreateDialog },
    { icon: <FilterList />, name: 'Filter', action: openFilterDialog },
  ];

  const isCreate = dialog.type === 'create';
  const isEdit = dialog.type === 'edit';
  const isDelete = dialog.type === 'delete';
  const isFilter = dialog.type === 'filter';

  const isFormDialogOpen = isCreate || isEdit;

  const formInitialData = isEdit ? dialog.withdrawal : initialWithdrawal;

  const reasonsList = isCreate || isEdit ? dialog.reasonsList : [];

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
        tablePaginationState={pagination}
        onPageChange={onPageChange}
        onRowPerPageChange={onRowsPerPageChange}
      >
        <WithdrawTableHeader />
        {withdrawalState.isLoading ? (
          <SkeletonTableBody
            rowPerPage={pagination.rowsPerPage}
            columnNumber={5}
          />
        ) : (
          <WithdrawTableBody
            withdrawals={currentPage}
            onRowDeleteClick={openDeleteDialog}
            onRowEditClick={openEditDialog}
          />
        )}
      </WithdrawTable>

      <WithdrawalFormDialog
        key={isEdit ? `edit-${dialog.withdrawal.id}` : 'create'}
        isOpen={isFormDialogOpen}
        initialData={formInitialData}
        reasonsList={reasonsList}
        onClose={closeDialog}
        onSubmit={handleUpdateSubmit}
      />

      <FilterDialog
        isOpen={isFilter}
        onClose={closeDialog}
      />

      <ConfirmationDialog
        isOpen={isDelete}
        onClose={closeDialog}
        onCancel={closeDialog}
        onConfirm={() => {
          if (isDelete) {
            handleDelete(dialog.withdrawal.id!);
          }
        }}
        message={
          isDelete
            ? `Delete withdrawal of ${toLocalMgCurrency(
                dialog.withdrawal.amount
              )} on ${dialog.withdrawal.date.toDateString()}?`
            : ''
        }
      />

      <AppSpeedDial elements={speedDialAction} />
    </Stack>
  );
}

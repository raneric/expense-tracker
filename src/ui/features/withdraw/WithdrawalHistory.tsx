import { AccountBalanceWallet, FilterList } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import { Stack } from '@mui/material';
import { useWithdrawalContext } from '../../../contexts/withdrawalsRetrieval/WithdrawalContext';
import { useWithdrawalHistory } from '../../../hooks/useWithdrawalHistory';
import useWithdrawalPagination from '../../../hooks/useWithdrawalPagination';
import useWithdrawalSubmit from '../../../hooks/useWithdrawalSubmit';
import type { SpeedDialActionElement } from '../../../type/PropsType';
import { initialWithdrawal } from '../../../utils/Const';
import AppSpeedDial from '../shared/SpeedDial/AppSpeedDial';
import ListSkeleton from './components/List/ListSkeleton';
import WithdrawalList from './components/List/WithdrawalList';
import WithdrawalTable from './components/Table/WithdrawalTable';
import WithdrawalTableBody from './components/Table/WithdrawalTableBody';
import WithdrawalTableHeader from './components/Table/WithdrawalTableHeader';

import { useCallback } from 'react';
import { WithdrawalActionsProvider } from '../../../contexts/WithdrawalActions/WithdrawalActionsProvider';
import { useResponsive } from '../../../hooks/useResponsive';
import useWithdrawalDelete from '../../../hooks/useWithdrawalDelete';
import { getConfirmationMessage } from '../../../utils/dataGeneratorUtilities';
import ConfirmationDialog from '../shared/Dialog/ConfirmationDialog';
import FilterDialog from '../shared/Dialog/FilterDialog';
import {
  SectionTitle,
  Tittle,
  TittleHelperInfo,
} from '../shared/SectionTitle/SectionTitle';
import SkeletonTableBody from '../shared/Table/SkeletonTableBody';
import { WithdrawalCharts } from './components/Chart/WithdrawalCharts';
import WithdrawalFormDialog from './components/Dialog/WithdrawalFormDialog';

/**
 * The WithdrawalHistory component is responsible for displaying the user's withdrawal history. It includes a section title, two sparkline charts (one for current withdrawals and one for forecasted withdrawals), a table of withdrawal transactions, and a form dialog for adding or editing withdrawals. The component uses the useLoaderData hook to fetch withdrawal data and manages the state for the form dialog and selected withdrawal row.
 * @returns A React component that renders the withdrawal history section of the application.
 */
export default function WithdrawalHistory() {
  const { isDesktop } = useResponsive();
  const { state: withdrawalState } = useWithdrawalContext();

  const {
    dialog,
    charts,
    openCreateDialog,
    openEditDialog,
    openDeleteDialog,
    closeDialog,
    openFilterDialog,
    openForecastValidationDialog,
  } = useWithdrawalHistory(withdrawalState.data);

  const { submitHandler, validateForecast, submitInProgress } =
    useWithdrawalSubmit(closeDialog);

  const { onDelete, deletionInProgress } = useWithdrawalDelete(closeDialog);

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
  const isForecastSubmit = dialog.type === 'forecast';

  const confirmationMessage = getConfirmationMessage(dialog);

  const handleConfirm = useCallback(() => {
    switch (dialog.type) {
      case 'delete':
        onDelete(dialog.withdrawal.id!);
        break;

      case 'forecast':
        validateForecast(dialog.withdrawal);
        break;
    }
  }, [dialog, onDelete, validateForecast]);

  const isFormDialogOpen = isCreate || isEdit;

  const formInitialData = isEdit ? dialog.withdrawal : initialWithdrawal;

  return (
    <Stack spacing={2}>
      <SectionTitle>
        <Tittle
          displayText="Withdrawal Activities"
          icon={<AccountBalanceWallet />}
        />
        <TittleHelperInfo displayText="Track your recent transactions" />
      </SectionTitle>

      <WithdrawalCharts
        current={charts.current}
        forecast={charts.forecast}
      />

      {isDesktop ? (
        <WithdrawalTable
          tablePaginationState={pagination}
          onPageChange={onPageChange}
          onRowPerPageChange={onRowsPerPageChange}
        >
          <WithdrawalTableHeader />
          {withdrawalState.isLoading ? (
            <SkeletonTableBody
              rowPerPage={pagination.rowsPerPage}
              columnNumber={5}
            />
          ) : (
            <WithdrawalActionsProvider
              onEdit={openEditDialog}
              onDelete={openDeleteDialog}
              onForecastValidated={openForecastValidationDialog}
            >
              <WithdrawalTableBody withdrawals={currentPage} />
            </WithdrawalActionsProvider>
          )}
        </WithdrawalTable>
      ) : withdrawalState.isLoading ? (
        <ListSkeleton rows={pagination.rowsPerPage} />
      ) : (
        <WithdrawalList withdrawals={withdrawalState.data} />
      )}

      <WithdrawalFormDialog
        key={isEdit ? `edit-${dialog.withdrawal.id}` : 'create'}
        isOpen={isFormDialogOpen}
        initialData={formInitialData}
        reasonsList={withdrawalState.reasons}
        onClose={closeDialog}
        onSubmit={submitHandler}
        submitInProgress={submitInProgress}
      />

      <FilterDialog
        isOpen={isFilter}
        onClose={closeDialog}
      />

      <ConfirmationDialog
        isOpen={isDelete || isForecastSubmit}
        onClose={closeDialog}
        onCancel={closeDialog}
        isConfirmationInProgress={deletionInProgress || submitInProgress}
        onConfirm={handleConfirm}
        message={confirmationMessage}
      />
      <AppSpeedDial elements={speedDialAction} />
    </Stack>
  );
}

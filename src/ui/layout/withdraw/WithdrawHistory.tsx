import { AccountBalanceWallet, FilterList } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import {
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Stack,
} from "@mui/material";
import { useLoaderData, useSubmit } from "react-router-dom";
import { useWithdrawalHistory } from "../../../hooks/useWithdrawalHistory";
import type { Withdrawal } from "../../../type/AppType";
import { initialWithdrawal } from "../../../utils/Const";
import { toLocalMgCurrency } from "../../../utils/formatterUtilities";
import { WithdrawalCharts } from "../../components/Charts/WithdrawalCharts";
import WithdrawalFormDialog from "../../components/Dialog/WithdrawalFormDialog";
import ConfirmationDialog from "../../components/FeedbackDialog/ConfirmationDialog";
import WithdrawTable from "../../components/Table/WithdrawTable";
import {
  SectionTitle,
  Tittle,
  TittleHelperInfo,
} from "../../core/SectionTitle";
import FilterDialog from "../../components/Dialog/FilterDialog";
import { useUserContext } from "../../../contexts/auth/UserContext";

/**
 * The WithdrawalHistory component is responsible for displaying the user's withdrawal history. It includes a section title, two sparkline charts (one for current withdrawals and one for forecasted withdrawals), a table of withdrawal transactions, and a form dialog for adding or editing withdrawals. The component uses the useLoaderData hook to fetch withdrawal data and manages the state for the form dialog and selected withdrawal row.
 * @returns A React component that renders the withdrawal history section of the application.
 */
export default function WithdrawalHistory() {
  const withdrawals: Withdrawal[] = useLoaderData();
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
  } = useWithdrawalHistory(withdrawals);

  const isFormDialogOpen = dialog.type === "create" || dialog.type === "edit";
  const formInitialData =
    dialog.type === "edit" ? dialog.withdrawal : initialWithdrawal;

  const handleUpdateSubmit = (withdrawal: Withdrawal) => {
    const formData = new FormData();

    for (const [key, value] of Object.entries(withdrawal)) {
      formData.append(key, String(value));
    }
    if (state.user) {
      formData.append("user", JSON.stringify(state.user));
    }
    submit(formData, { method: "post", action: "/withdrawals" });
    closeDialog();
  };

  const speedDialAction = [
    { icon: <AddIcon />, name: "Add", action: openCreateDialog },
    { icon: <FilterList />, name: "Filter", action: openFilterDialog },
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

      <WithdrawalCharts current={charts.current} forecast={charts.forecast} />

      <WithdrawTable
        withdrawals={withdrawals}
        onRowEditClick={openEditDialog}
        onRowDeleteClick={openDeleteDialog}
      />

      <WithdrawalFormDialog
        key={dialog.type === "edit" ? `edit-${dialog.withdrawal.id}` : "create"}
        isOpen={isFormDialogOpen}
        initialData={formInitialData}
        onClose={closeDialog}
        onSubmit={handleUpdateSubmit}
      />

      <FilterDialog
        isOpen={dialog.type === "filter"}
        onClose={closeDialog}
        onStartDateChange={() => {}}
        onEndDateChange={() => {}}
      />

      <ConfirmationDialog
        isOpen={dialog.type === "delete"}
        onClose={closeDialog}
        onCancel={closeDialog}
        onConfirm={() => {
          if (dialog.type === "delete") {
            handleUpdateSubmit(dialog.withdrawal);
          }
        }}
        message={
          dialog.type === "delete"
            ? `Delete withdrawal of ${toLocalMgCurrency(
                dialog.withdrawal.amount
              )} on ${dialog.withdrawal.date.toDateString()}?`
            : ""
        }
      />

      <SpeedDial
        sx={{
          position: "fixed",
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

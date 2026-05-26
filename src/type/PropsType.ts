import { type PickerDayProps } from '@mui/x-date-pickers';
import type { GasEvent, TablePaginationState, Withdrawal } from './AppType';
export interface BasePropsType {
  children?: React.ReactNode;
}

export interface ExpenseSparkLineProps<T> {
  dataLabel: string;
  dataset: number[];
  dimension: T[];
}

export interface WithdrawRowEventProps {
  onRowEditClick: (withdrawal: Withdrawal) => void;
  onRowDeleteClick: (withdrawal: Withdrawal) => void;
}

export interface WithdrawTableProps extends BasePropsType {
  tablePaginationState: TablePaginationState;
  onPageChange: (_event: unknown, newPage: number) => void;
  onRowPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface WithdrawTableBodyProps extends WithdrawRowEventProps {
  withdrawals: Withdrawal[];
}

export interface WithdrawTableRowProps extends WithdrawRowEventProps {
  withdrawal: Withdrawal;
}

export interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface FilterDialogProps extends DialogProps {
  onStartDateChange: () => void;
  onEndDateChange: () => void;
}

export interface FeedbackDialogProps extends DialogProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export interface DialogFormProps<T> extends DialogProps {
  initialData: T;
  reasonsList: string[];
  onSubmit: (data: T) => void;
}

export interface DimensionalChartProps<T, U> {
  dataset: T[];
  dimension: U[];
}

export interface GasEventsDataProps {
  gasEvents: GasEvent[];
}

export type GasEventData = {
  startDates: Set<string>;
  endDates: Set<string>;
  forecastedDate?: string;
};

export interface CalendarDayProps extends PickerDayProps {
  gasEventData?: GasEventData;
}

export interface InfoRowProps {
  label: string;
  value: string;
}

export interface GasEventProps {
  previous: GasEvent;
  current: GasEvent;
  forecast: string;
}

export interface SpeedDialActionElement {
  icon: React.ReactNode;
  name: string;
  action: () => void;
}

export interface SpeedDialProps {
  elements: SpeedDialActionElement[];
}

export interface WithdrawalChartsProps {
  current: DimensionalChartProps<number, Date>;
  forecast: DimensionalChartProps<number, Date>;
}

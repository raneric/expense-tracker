import { type PickerDayProps } from '@mui/x-date-pickers';
import type { PropsWithChildren } from 'react';
import type {
  GasEvent,
  GasFormDialogData,
  TablePaginationState,
  Withdrawal,
} from './AppType';

interface Submittable<T> {
  onSubmit: (data: T) => void | Promise<boolean>;
}

export interface ComparisonChartProps<T> {
  dataLabel: string;
  dataset: number[];
  dimension: T[];
}

export interface ChartSeriesProps<T, U> {
  series: T[];
  dimension: U[];
}
export interface ExpenseSparkLineProps extends ComparisonChartProps<Date> {
  total?: number;
}

export interface WithdrawRowEventProps {
  onRowEditClick: (withdrawal: Withdrawal) => void;
  onRowDeleteClick: (withdrawal: Withdrawal) => void;
}

export type WithdrawTableProps = PropsWithChildren<{
  tablePaginationState: TablePaginationState;
  onPageChange: (_event: unknown, newPage: number) => void;
  onRowPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}>;

export interface WithdrawTableBodyProps extends WithdrawRowEventProps {
  withdrawals: Withdrawal[];
}

export interface WithdrawalListProps {
  withdrawals: Withdrawal[];
}

export interface WithdrawTableRowProps extends WithdrawRowEventProps {
  withdrawal: Withdrawal;
}

export interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface GasEventDialogProps
  extends DialogProps, Submittable<GasFormDialogData> {}

export interface FilterDialogProps extends DialogProps {
  onStartDateChange: () => void;
  onEndDateChange: () => void;
}

export interface FeedbackDialogProps extends DialogProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export interface DialogFormProps<T> extends DialogProps, Submittable<T> {
  initialData: T;
}

export interface WithdrawalDialogFormProps extends DialogFormProps<Withdrawal> {
  reasonsList: string[];
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
  forecastedDate?: string;
};

export interface CalendarDayProps extends PickerDayProps {
  gasEventData?: GasEventData;
  onDayCellClick?: (date: string) => void;
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

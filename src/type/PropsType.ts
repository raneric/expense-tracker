import { type PickerDayProps } from '@mui/x-date-pickers';
import type { Withdrawal } from './AppType';
export interface BasePropsType {
  children?: React.ReactNode;
}

export interface ExpenseSparkLineProps<T> {
  dataLabel: string;
  dataset: number[];
  dimension: T[];
}

export interface WithdrawTableProps {
  withdrawals: Withdrawal[];
  onRowEditClick: (withdrawal: Withdrawal) => void;
  onRowDeleteClick: (withdrawal: Withdrawal) => void;
}

export interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface FeedbackDialogProps extends DialogProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export interface DialogFormProps<T> extends DialogProps {
  initialData: T;
  onSubmit: (data: T) => void;
}

export interface DimensionalChartProps<T, U> {
  dataset: T[];
  dimension: U[];
}

export interface GasEventsDataProps {
  gasEvents: GasEvent[];
}

type GasEventType = 'done' | 'previous' | 'current';
export interface GasEvent {
  startDate: string;
  endDate: string | null;
  totalDays: number;
  type: GasEventType;
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

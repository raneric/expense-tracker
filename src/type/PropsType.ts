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

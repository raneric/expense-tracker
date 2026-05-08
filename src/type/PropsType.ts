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
  onRowDeleteClick: (id: string) => void;
}

export interface DialogFormProps<T> {
  isOpen: boolean;
  formData: T;
  onClose: () => void;
  onInputDataChange: (data: T) => void;
}

import type { ReactNode } from 'react';

export interface BasePropsType {
  children?: ReactNode;
}

export interface ExpenseSparkLineProps<T> extends BasePropsType {
  dataLabel: string;
  dataset: number[];
  dimension: T[];
}

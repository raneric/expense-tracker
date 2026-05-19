import { useMemo, useState } from 'react';
import type { TablePaginationState, Withdrawal } from '../type/AppType';

const defaultPaginationState: TablePaginationState = {
  page: 0,
  rowsPerPage: 5,
};

export default function useWithdrawalPagination(withdrawals: Withdrawal[]) {
  const [pagination, setPagination] = useState<TablePaginationState>(
    defaultPaginationState
  );

  const { page, rowsPerPage } = pagination;

  const currentPage = useMemo(
    () =>
      withdrawals.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [withdrawals, page, rowsPerPage]
  );

  const onPageChange = (_: unknown, page: number) => {
    setPagination((prev) => ({ ...prev, page }));
  };

  const onRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPagination({
      page: 0,
      rowsPerPage: Number(event.target.value),
    });
  };

  return {
    pagination,
    currentPage,
    onPageChange,
    onRowsPerPageChange,
  };
}

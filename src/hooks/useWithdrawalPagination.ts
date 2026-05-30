import { useMemo, useState } from 'react';
import type { TablePaginationState, Withdrawal } from '../type/AppType';

/**
 * Default pagination configuration: first page with 5 rows per page
 */
const defaultPaginationState: TablePaginationState = {
  page: 0,
  rowsPerPage: 10,
};

/**
 * Custom hook for managing pagination state of withdrawal tables.
 *
 * Handles page and rows per page state, and computes the current page data slice.
 * Provides handlers for page changes and rows per page changes that work with MUI
 * TablePagination component.
 *
 * @param {Withdrawal[]} withdrawals - Full array of withdrawals to paginate
 * @returns {Object} Object containing:
 *   - {TablePaginationState} pagination - Current pagination state (page and rowsPerPage)
 *   - {Withdrawal[]} currentPage - Sliced array of withdrawals for current page
 *   - {Function} onPageChange - MUI-compatible page change handler (signature: (_, page: number) => void)
 *   - {Function} onRowsPerPageChange - MUI-compatible rows per page change handler
 *
 * @example
 * const { pagination, currentPage, onPageChange } = useWithdrawalPagination(withdrawals);
 * // Pass pagination state to TablePagination component
 * // Render currentPage items in table
 *
 * @note Resets to page 0 when rows per page changes
 * @note Uses memoization to prevent unnecessary re-renders of table data
 */
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

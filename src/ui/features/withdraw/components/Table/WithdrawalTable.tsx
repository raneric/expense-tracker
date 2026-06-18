import {
  Box,
  Paper,
  Table,
  TableContainer,
  TablePagination,
} from '@mui/material';
import type { WithdrawTableProps } from '../../../../../type/PropsType';
import { useWithdrawalContext } from '../../../../../contexts/withdrawalsRetrieval/WithdrawalContext';

/**
 * A table for displaying withdrawal information.
 * @param props - The properties for the WithdrawTable component.
 * @param props.withdrawals - An array of withdrawal objects to display in the table.
 * @param props.onRowEditClick - A callback function that is called when the edit button is clicked for a row. It receives the corresponding withdrawal object as an argument.
 * @param props.onRowDeleteClick - A callback function that is called when the delete button is clicked for a row. It receives the ID of the corresponding withdrawal as an argument.
 * @returns A React component that renders a table of withdrawals with pagination, edit, and delete functionality.
 */
export default function WithdrawalTable({
  tablePaginationState,
  onPageChange,
  onRowPerPageChange,
  children,
}: WithdrawTableProps) {
  const { state } = useWithdrawalContext();
  return (
    <Box>
      <TableContainer component={Paper}>
        <Table>{children}</Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={state.data.length}
        page={tablePaginationState.page}
        onPageChange={onPageChange}
        rowsPerPage={tablePaginationState.rowsPerPage}
        onRowsPerPageChange={onRowPerPageChange}
        rowsPerPageOptions={[5, 10, 20]}
      />
    </Box>
  );
}

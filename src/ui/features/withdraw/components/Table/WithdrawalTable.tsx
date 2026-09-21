import {
  Box,
  Paper,
  Table,
  TableContainer,
  TablePagination,
} from '@mui/material';
import { keyframes } from '@mui/material/styles';
import type { WithdrawTableProps } from '../../../../../type/PropsType';
import { useWithdrawalContext } from '../../../../../contexts/withdrawalsRetrieval/WithdrawalContext';

// Stretch-in with a small bounce when the rows-per-page value changes:
// keying the container on rowsPerPage remounts it, which restarts the
// animation. The table grows from its top edge, overshoots, then settles.
const tableStretchIn = keyframes`
  0% {
    opacity: 0;
    transform: scaleY(0.75);
  }
  55% {
    opacity: 1;
    transform: scaleY(1.04);
  }
  75% {
    transform: scaleY(0.97);
  }
  90% {
    transform: scaleY(1.01);
  }
  100% {
    opacity: 1;
    transform: scaleY(1);
  }
`;

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
      <TableContainer
        key={tablePaginationState.rowsPerPage}
        component={Paper}
        sx={{
          transformOrigin: 'top',
          animation: `${tableStretchIn} 480ms ease-out both`,
        }}
      >
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

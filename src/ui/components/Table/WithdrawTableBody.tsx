import { TableBody } from '@mui/material';
import type { Withdrawal } from '../../../type/AppType';
import type { WithdrawTableBodyProps } from '../../../type/PropsType';
import EmptyTableFeedback from './EmptyTableFeedback';
import WithdrawTableRow from './WithdrawTableRow';

export default function WithdrawTableBody({
  withdrawals,
  onRowEditClick,
  onRowDeleteClick,
}: WithdrawTableBodyProps) {
  return (
    <TableBody>
      {withdrawals.length > 0 ? (
        withdrawals.map((withdrawal: Withdrawal) => (
          <WithdrawTableRow
            withdrawal={withdrawal}
            onRowDeleteClick={() => onRowDeleteClick(withdrawal)}
            onRowEditClick={() => onRowEditClick(withdrawal)}
          />
        ))
      ) : (
        <EmptyTableFeedback />
      )}
    </TableBody>
  );
}

import { TableBody } from '@mui/material';
import type { Withdrawal } from '../../../../../type/AppType';
import type { WithdrawTableBodyProps } from '../../../../../type/PropsType';
import EmptyTableFeedback from './EmptyTableFeedback';
import WithdrawalTableRow from './WithdrawalTableRow';

export default function WithdrawalTableBody({
  withdrawals,
  onRowEditClick,
  onRowDeleteClick,
}: WithdrawTableBodyProps) {
  return (
    <TableBody>
      {withdrawals.length > 0 ? (
        withdrawals.map((withdrawal: Withdrawal) => (
          <WithdrawalTableRow
            key={withdrawal.id}
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

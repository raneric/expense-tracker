import { TableBody } from '@mui/material';
import type { Withdrawal } from '../../../../../type/AppType';
import type { WithdrawTableBodyProps } from '../../../../../type/PropsType';
import EmptyTableFeedback from './EmptyTableFeedback';
import WithdrawalTableRow from './WithdrawalTableRow';
import { useWithdrawalActions } from '../../../../../contexts/WithdrawalActions/WithdrawalActionsContext';

export default function WithdrawalTableBody({
  withdrawals,
}: WithdrawTableBodyProps) {
  const { onEdit, onDelete } = useWithdrawalActions();
  return (
    <TableBody>
      {withdrawals.length > 0 ? (
        withdrawals.map((withdrawal: Withdrawal) => (
          <WithdrawalTableRow
            key={withdrawal.id}
            withdrawal={withdrawal}
            onRowDeleteClick={() => onDelete(withdrawal)}
            onRowEditClick={() => onEdit(withdrawal)}
          />
        ))
      ) : (
        <EmptyTableFeedback />
      )}
    </TableBody>
  );
}

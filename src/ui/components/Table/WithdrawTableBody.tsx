import { TableBody } from '@mui/material';
import type { Withdrawal } from '../../../type/AppType';
import type { WithdrawTableBodyProps } from '../../../type/PropsType';
import WithdrawTableRow from './WithdrawTableRow';

export default function WithdrawTableBody({
  withdrawals,
  onRowEditClick,
  onRowDeleteClick,
}: WithdrawTableBodyProps) {
  return (
    <TableBody>
      {withdrawals.map((withdrawal: Withdrawal) => (
        <WithdrawTableRow
          withdrawal={withdrawal}
          onRowDeleteClick={() => onRowDeleteClick(withdrawal)}
          onRowEditClick={() => onRowEditClick(withdrawal)}
        />
      ))}
    </TableBody>
  );
}

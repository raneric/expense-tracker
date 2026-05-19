import { DeleteForever, Edit } from '@mui/icons-material';
import { IconButton, TableCell, TableRow } from '@mui/material';
import type { WithdrawTableRowProps } from '../../../type/PropsType';
import { toLocalMgCurrency } from '../../../utils/formatterUtilities';

const forecastedStyle = { color: 'warning.main', fontWeight: 'bold' };

export default function WithdrawTableRow({
  withdrawal,
  onRowEditClick,
  onRowDeleteClick,
}: WithdrawTableRowProps) {
  return (
    <>
      <TableRow
        key={withdrawal.id}
        hover
      >
        <TableCell sx={withdrawal.isForecast ? forecastedStyle : {}}>
          {withdrawal.reasons.join(', ')}
        </TableCell>
        <TableCell sx={withdrawal.isForecast ? forecastedStyle : {}}>
          {withdrawal.date.toDateString()}
        </TableCell>
        <TableCell sx={withdrawal.isForecast ? forecastedStyle : {}}>
          {withdrawal.location}
        </TableCell>
        <TableCell
          sx={withdrawal.isForecast ? forecastedStyle : {}}
          align="right"
        >
          {toLocalMgCurrency(withdrawal.amount)}
        </TableCell>
        <TableCell
          size="small"
          sx={withdrawal.isForecast ? { ...forecastedStyle, width: 200 } : {}}
          align="right"
        >
          <IconButton onClick={() => onRowEditClick(withdrawal)}>
            <Edit />
          </IconButton>
          <IconButton onClick={() => onRowDeleteClick(withdrawal)}>
            <DeleteForever />
          </IconButton>
        </TableCell>
      </TableRow>
    </>
  );
}

import { DeleteForever, Edit } from '@mui/icons-material';
import { IconButton, TableCell, TableRow } from '@mui/material';
import { toLocalMgCurrency } from '../../../../../utils/formatterUtilities';
import ReasonsCell from './ReasonsCell';
import type { WithdrawTableRowProps } from '../../../../../type/PropsType';
import { useCallback } from 'react';

const forecastedStyle = { color: 'warning.main', fontWeight: 'bold' };

export default function WithdrawalTableRow({
  withdrawal,
  onRowEditClick,
  onRowDeleteClick,
}: WithdrawTableRowProps) {
  const handleEdit = useCallback(
    () => onRowEditClick(withdrawal),
    [withdrawal, onRowEditClick]
  );

  const handleDelete = useCallback(
    () => onRowDeleteClick(withdrawal),
    [withdrawal, onRowDeleteClick]
  );

  return (
    <>
      <TableRow
        key={withdrawal.id}
        hover
      >
        <TableCell sx={withdrawal.isForecast ? forecastedStyle : {}}>
          <ReasonsCell withdrawal={withdrawal} />
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
          <IconButton onClick={handleEdit}>
            <Edit />
          </IconButton>
          <IconButton onClick={handleDelete}>
            <DeleteForever />
          </IconButton>
        </TableCell>
      </TableRow>
    </>
  );
}

import { CheckCircleTwoTone, DeleteForever, Edit } from '@mui/icons-material';
import { IconButton, TableCell, TableRow, Tooltip } from '@mui/material';
import { useWithdrawalActions } from '../../../../../contexts/WithdrawalActions/WithdrawalActionsContext';
import type { WithdrawTableRowProps } from '../../../../../type/PropsType';
import { toLocalMgCurrency } from '../../../../../utils/formatterUtilities';
import ReasonsCell from './ReasonsCell';

const forecastedStyle = { color: 'warning.main', fontWeight: 'bold' };

export default function WithdrawalTableRow({
  withdrawal,
}: WithdrawTableRowProps) {
  const { onEdit, onDelete, onForecastValidated } = useWithdrawalActions();
  return (
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
        {withdrawal.isForecast && (
          <Tooltip title="Validate forecast">
            <IconButton
              aria-label={`Validate forecast of ${withdrawal.amount}`}
              onClick={() => onForecastValidated(withdrawal)}
            >
              <CheckCircleTwoTone color="warning" />
            </IconButton>
          </Tooltip>
        )}
        <Tooltip title="Edit">
          <IconButton
            aria-label={`Edit withdrawal of ${withdrawal.amount}`}
            onClick={() => onEdit(withdrawal)}
          >
            <Edit />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton
            aria-label={`Delete withdrawal of ${withdrawal.amount}`}
            onClick={() => onDelete(withdrawal)}
          >
            <DeleteForever />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
}

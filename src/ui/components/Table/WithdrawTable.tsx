import {
  CalendarMonth,
  DeleteForever,
  ExploreTwoTone,
  InfoTwoTone,
  PaidTwoTone,
  Settings,
} from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import { useState } from 'react';
import type { Withdrawal } from '../../../type/AppType';
import { rows } from '../../../utils/Const';
import { toLocalMgCurrency } from '../../../utils/utilities';
import Colors from '../../Theming/Colors';
import { CustomFontSize } from '../../Theming/Typography';
export default function WithdrawTable({ withdrawals }: { withdrawals: Withdrawal[] }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const headerCellStyle = {
    fontWeight: 'bold',
    color: Colors.tint200,
    fontSize: CustomFontSize.tableHeader,
    backgroundColor: Colors.tint900,
  };
  const headerCellContentStyle = { display: 'flex', alignItems: 'center', gap: '0.5rem' };
  const forecastedStyle = { color: 'warning.main', fontWeight: 'bold' };
  return (
    <Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={headerCellStyle}>
                <Box sx={headerCellContentStyle}>
                  <span>Reasons</span>
                  <InfoTwoTone />
                </Box>
              </TableCell>
              <TableCell sx={headerCellStyle}>
                <Box sx={headerCellContentStyle}>
                  <span>Date</span>
                  <CalendarMonth />
                </Box>
              </TableCell>
              <TableCell sx={headerCellStyle}>
                <Box sx={headerCellContentStyle}>
                  <span>Location</span>
                  <ExploreTwoTone />
                </Box>
              </TableCell>
              <TableCell sx={headerCellStyle}>
                <Box sx={{ ...headerCellContentStyle, justifyContent: 'end' }}>
                  <span>Amount</span>
                  <PaidTwoTone />
                </Box>
              </TableCell>
              <TableCell sx={headerCellStyle}>
                <Box sx={{ ...headerCellContentStyle, justifyContent: 'end' }}>
                  <span>Actions</span>
                  <Settings />
                </Box>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {withdrawals
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((withdrawal: Withdrawal) => (
                <TableRow key={withdrawal.id} hover>
                  <TableCell sx={withdrawal.isForecast ? forecastedStyle : {}}>
                    {withdrawal.reasons.join(', ')}
                  </TableCell>
                  <TableCell sx={withdrawal.isForecast ? forecastedStyle : {}}>
                    {withdrawal.date.toDateString()}
                  </TableCell>
                  <TableCell sx={withdrawal.isForecast ? forecastedStyle : {}}>
                    {withdrawal.location}
                  </TableCell>
                  <TableCell sx={withdrawal.isForecast ? forecastedStyle : {}} align='right'>
                    {toLocalMgCurrency(withdrawal.amount)}
                  </TableCell>
                  <TableCell
                    size='small'
                    sx={withdrawal.isForecast ? { ...forecastedStyle, width: 200 } : {}}
                    align='right'
                  >
                    <IconButton>
                      <EditIcon />
                    </IconButton>
                    <IconButton>
                      <DeleteForever />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component='div'
        count={rows.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 20]}
      />
    </Box>
  );
}

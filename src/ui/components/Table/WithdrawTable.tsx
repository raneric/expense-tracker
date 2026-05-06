import {
  AccountBalanceWallet,
  CalendarMonth,
  ExploreTwoTone,
  HelpTwoTone,
  InfoTwoTone,
  PaidTwoTone,
} from '@mui/icons-material';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { rows } from '../../../utils/Const';
import SectionTitle from '../../core/SectionTitle';
import Colors from '../../Theming/Colors';
import CustomFontSize from '../../Theming/Typography';
import type { Withdrawal } from '../../../type/AppType';

export default function WithdrawTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const withdrawals = useLoaderData();

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const headerCellStyle = {
    fontWeight: 'bold',
    color: Colors.lightBlue200,
    fontSize: CustomFontSize.tableHeader,
    backgroundColor: Colors.lightBlue900,
  };
  const headerCellContentStyle = { display: 'flex', alignItems: 'center', gap: '0.5rem' };

  const titleBoxAlign = { display: 'flex', alignItems: 'center', gap: 1 };

  return (
    <Box>
      <SectionTitle>
        <Box sx={titleBoxAlign}>
          <AccountBalanceWallet />
          <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
            Withdrawal Activity
          </Typography>
        </Box>
        <Box sx={titleBoxAlign}>
          <Typography variant='body2' sx={{ opacity: 0.88 }}>
            Track your recent transactions and spending patterns
          </Typography>
          <HelpTwoTone sx={{ fontSize: '1.8rem' }} />
        </Box>
      </SectionTitle>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={headerCellStyle}>
                <Box sx={headerCellContentStyle}>
                  <span>Reason</span>
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
            </TableRow>
          </TableHead>
          <TableBody>
            {withdrawals
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((withdrawal: Withdrawal) => (
                <TableRow key={withdrawal.id} hover>
                  <TableCell>{withdrawal.reason}</TableCell>
                  <TableCell>{withdrawal.date.toDateString()}</TableCell>
                  <TableCell>{withdrawal.location}</TableCell>
                  <TableCell align='right'>{withdrawal.amount} Ar</TableCell>
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

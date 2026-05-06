import { useState } from 'react';
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
import Colors from '../../Theming/Colors';
import CustomFontSize from '../../Theming/Typography';
import {
  AccountBalanceWallet,
  CalendarMonth,
  ExploreTwoTone,
  HelpTwoTone,
  InfoTwoTone,
  PaidTwoTone,
} from '@mui/icons-material';
import SectionTitle from '../../core/SectionTitle';

interface WithdrawRow {
  id: number;
  reason: string;
  date: string;
  location: string;
  amount: string;
}

const rows: WithdrawRow[] = [
  {
    id: 1,
    reason: 'ATM Withdrawal',
    date: '2026-05-02',
    location: 'New York',
    amount: '240.00',
  },
  {
    id: 2,
    reason: 'Groceries',
    date: '2026-05-01',
    location: 'Los Angeles',
    amount: '128.50',
  },
  {
    id: 3,
    reason: 'Gas',
    date: '2026-04-30',
    location: 'Chicago',
    amount: '42.30',
  },
  {
    id: 4,
    reason: 'Medical',
    date: '2026-04-29',
    location: 'Houston',
    amount: '315.20',
  },
  {
    id: 5,
    reason: 'Rent',
    date: '2026-04-28',
    location: 'San Francisco',
    amount: '1,350.00',
  },
  {
    id: 6,
    reason: 'Utilities',
    date: '2026-04-27',
    location: 'Seattle',
    amount: '98.75',
  },
  {
    id: 7,
    reason: 'Subscription',
    date: '2026-04-26',
    location: 'Austin',
    amount: '22.99',
  },
  {
    id: 8,
    reason: 'Dining',
    date: '2026-04-25',
    location: 'Miami',
    amount: '76.40',
  },
  {
    id: 9,
    reason: 'Travel',
    date: '2026-04-24',
    location: 'Denver',
    amount: '519.00',
  },
  {
    id: 10,
    reason: 'Office Supplies',
    date: '2026-04-23',
    location: 'Boston',
    amount: '63.12',
  },
  {
    id: 11,
    reason: 'Shopping',
    date: '2026-04-22',
    location: 'Portland',
    amount: '184.70',
  },
  {
    id: 12,
    reason: 'Gym',
    date: '2026-04-21',
    location: 'San Diego',
    amount: '45.00',
  },
  {
    id: 13,
    reason: 'Insurance',
    date: '2026-04-20',
    location: 'Philadelphia',
    amount: '212.60',
  },
  {
    id: 14,
    reason: 'Education',
    date: '2026-04-19',
    location: 'Atlanta',
    amount: '540.00',
  },
  {
    id: 15,
    reason: 'Gift',
    date: '2026-04-18',
    location: 'Dallas',
    amount: '120.00',
  },
  {
    id: 16,
    reason: 'Home Repair',
    date: '2026-04-17',
    location: 'Phoenix',
    amount: '287.90',
  },
  {
    id: 17,
    reason: 'Entertainment',
    date: '2026-04-16',
    location: 'Las Vegas',
    amount: '89.10',
  },
  {
    id: 18,
    reason: 'Parking',
    date: '2026-04-15',
    location: 'San Jose',
    amount: '18.00',
  },
  {
    id: 19,
    reason: 'Pet Care',
    date: '2026-04-14',
    location: 'Orlando',
    amount: '65.55',
  },
  {
    id: 20,
    reason: 'Taxi',
    date: '2026-04-13',
    location: 'Nashville',
    amount: '31.25',
  },
];

export default function WithdrawTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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
              <TableCell sx={{ ...headerCellStyle, justifyContent: 'end' }} align='right'>
                <Box sx={headerCellContentStyle}>
                  <span>Amount</span>
                  <PaidTwoTone />
                </Box>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow key={row.id} hover>
                <TableCell>{row.reason}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.location}</TableCell>
                <TableCell align='right'>{row.amount} Ar</TableCell>
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

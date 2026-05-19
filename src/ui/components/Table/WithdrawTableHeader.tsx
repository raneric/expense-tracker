import {
  CalendarMonth,
  EditNote,
  ExploreTwoTone,
  InfoTwoTone,
  PaidTwoTone,
} from '@mui/icons-material';
import { Box, TableCell, TableHead, TableRow } from '@mui/material';
import Colors from '../../Theming/Colors';
import AppTypography from '../../Theming/Typography';

const headerCellStyle = {
  fontWeight: 'bold',
  color: Colors.tint200,
  fontSize: AppTypography.FontSize.tableHeader,
  backgroundColor: Colors.tint900,
};

const headerCellContentStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
};

export default function WithdrawTableHeader() {
  return (
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
            <EditNote />
          </Box>
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

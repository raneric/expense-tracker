import {
  CalendarMonth,
  EditNote,
  ExploreTwoTone,
  InfoTwoTone,
  PaidTwoTone,
} from '@mui/icons-material';
import { Box, TableCell, TableHead, TableRow } from '@mui/material';
import Colors from '../../../../Theming/Colors';
import AppTypography from '../../../../Theming/Typography';
import { styled } from '@mui/material/styles';

const CellContainer = styled(TableCell)(() => ({
  fontWeight: 'bold',
  color: Colors.tint200,
  fontSize: AppTypography.FontSize.tableHeader,
  backgroundColor: Colors.tint900,
}));

const CellContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

export default function WithdrawalTableHeader() {
  return (
    <TableHead>
      <TableRow>
        <CellContainer>
          <CellContent>
            <span>Reasons</span>
            <InfoTwoTone />
          </CellContent>
        </CellContainer>
        <CellContainer>
          <CellContent>
            <span>Date</span>
            <CalendarMonth />
          </CellContent>
        </CellContainer>
        <CellContainer>
          <CellContent>
            <span>Location</span>
            <ExploreTwoTone />
          </CellContent>
        </CellContainer>
        <CellContainer>
          <CellContent sx={{ justifyContent: 'end' }}>
            <span>Amount</span>
            <PaidTwoTone />
          </CellContent>
        </CellContainer>
        <CellContainer>
          <CellContent sx={{ justifyContent: 'end' }}>
            <span>Actions</span>
            <EditNote />
          </CellContent>
        </CellContainer>
      </TableRow>
    </TableHead>
  );
}

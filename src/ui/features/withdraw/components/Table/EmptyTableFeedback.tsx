import { BrokenImage, RestartAlt } from '@mui/icons-material';
import {
  Box,
  Button,
  Stack,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import { useWithdrawalContext } from '../../../../../contexts/dataRetrieval/WithdrawalContext';

export default function EmptyTableFeedback() {
  const { resetFilter } = useWithdrawalContext();
  return (
    <TableRow>
      <TableCell
        colSpan={5}
        sx={{
          height: 360,
          borderBottom: 'none',
          backgroundColor: 'grey.50',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            width: '100%',
          }}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: 'center',
              textAlign: 'center',
              maxWidth: 420,
            }}
          >
            <BrokenImage
              sx={{
                fontSize: 64,
                color: 'text.disabled',
              }}
            />

            <Typography variant="h5">⚠️ No Data Found⚠️ </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
            >
              Try selecting another date range or adjusting filters.
            </Typography>
            <Button
              variant="contained"
              sx={{ fontWeight: 'bold' }}
              startIcon={<RestartAlt />}
              onClick={resetFilter}
            >
              {' '}
              Reset filter
            </Button>
          </Stack>
        </Box>
      </TableCell>
    </TableRow>
  );
}

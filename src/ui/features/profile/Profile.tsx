import {
  Avatar,
  Box,
  Card,
  Chip,
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { useUserContext } from '../../../contexts/auth/UserContext';
import { Edit, Visibility, VisibilityOff } from '@mui/icons-material';
import useTemporaryVisibility from '../../../hooks/useTemporaryVisibility';
import { useMemo, useState } from 'react';
import Colors from '../../Theming/Colors';
import PasswordConfirmationDialog from '../shared/Dialog/PasswordConfirmationDialog';
import { toLocalMgCurrency } from '../../../utils/formatterUtilities';
import { HIDDEN_AMOUNT } from '../../../utils/Const';
import ProfileSkeleton from './components/Skeleton/ProfileSkeleton';
import InfoCard from './components/Card/InfoCard';
import SalaryEditDialog from './components/Dialog/SalaryEditDialog';

export default function Profile() {
  const { state } = useUserContext();

  const [editDialog, setEditDialog] = useState(false);

  const user = useMemo(() => {
    return state.profile;
  }, [state]);

  const { sensitiveDataVisibility, passwordDialog, hide, confirmPassword } =
    useTemporaryVisibility();

  return (
    <>
      <SalaryEditDialog
        isOpen={editDialog}
        onClose={() => {
          setEditDialog(false);
        }}
      />
      <PasswordConfirmationDialog
        isOpen={passwordDialog}
        onClose={hide}
        onSubmit={confirmPassword}
        initialData=""
      />
      {!user ? (
        <ProfileSkeleton />
      ) : (
        <Card
          elevation={0}
          sx={{
            maxWidth: 850,
            mx: 'auto',
            overflow: 'hidden',
            borderRadius: 5,
            border: '1px solid',
            borderColor: 'grey.200',
          }}
        >
          {/* Header */}
          <Box
            sx={{
              height: 180,
              background: `
              linear-gradient(
                135deg,
                #03a9f4 0%,
                #0288d1 60%,
                #01579b 100%
              )
            `,
              position: 'relative',
            }}
          />

          {/* Profile */}
          <Box
            sx={{
              px: 4,
              pb: 4,
              mt: '-60px',
            }}
          >
            <Stack
              sx={{ alignItems: 'center' }}
              spacing={1.5}
            >
              <Avatar
                src={user.pictureUrl}
                alt={`${user.firstName} ${user.lastName}`}
                sx={{
                  width: 120,
                  height: 120,
                  border: '5px solid white',
                  boxShadow: 3,
                }}
              />

              <Typography
                variant="h4"
                sx={{ fontWeight: 700, color: Colors.tint900 }}
              >
                {user.firstName} {user.lastName}
              </Typography>

              <Typography color="text.secondary">{user.email}</Typography>

              <Chip
                label="🟢 Connected"
                variant="outlined"
                color="success"
              />
            </Stack>

            <Divider sx={{ my: 4 }} />

            {/* Personal Info */}
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, mb: 2 }}
            >
              Personal Information
            </Typography>

            <Grid
              container
              spacing={2}
            >
              <Grid size={{ xs: 12, md: 6 }}>
                <InfoCard
                  label="First Name"
                  value={user.firstName}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <InfoCard
                  label="Last Name"
                  value={user.lastName}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <InfoCard
                  label="Email"
                  value={user.email}
                />
              </Grid>
            </Grid>

            <Typography
              variant="h6"
              sx={{ fontWeight: 700, mt: 4, mb: 2 }}
            >
              Financial Information
            </Typography>

            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3,
                bgcolor: '#e1f5fe',
                border: '1px solid #81d4fa',
              }}
            >
              <Stack
                direction="row"
                sx={{ justifyContent: 'space-between', alignItems: 'center' }}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  Salary
                </Typography>

                <Stack
                  direction="row"
                  spacing={0.5}
                >
                  <Tooltip title="Edit salary">
                    <IconButton
                      size="small"
                      onClick={() => {
                        setEditDialog(true);
                      }}
                    >
                      <Edit fontSize="small" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip
                    title={
                      sensitiveDataVisibility ? 'Hide salary' : 'Show salary'
                    }
                  >
                    <IconButton
                      size="small"
                      onClick={hide}
                    >
                      {sensitiveDataVisibility ? (
                        <VisibilityOff fontSize="small" />
                      ) : (
                        <Visibility fontSize="small" />
                      )}
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Stack>
              <Typography
                variant="h4"
                sx={{ fontWeight: 800 }}
                color="#01579b"
              >
                {sensitiveDataVisibility
                  ? toLocalMgCurrency(user.salary)
                  : HIDDEN_AMOUNT}
              </Typography>
            </Paper>
          </Box>
        </Card>
      )}
    </>
  );
}

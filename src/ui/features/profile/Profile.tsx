import {
  Avatar,
  Badge,
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
import {
  AttachMoney,
  Camera,
  Edit,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import useTemporaryVisibility from '../../../hooks/useTemporaryVisibility';
import { useCallback, useMemo, useState } from 'react';
import Colors from '../../Theming/Colors';
import PasswordConfirmationDialog from '../shared/Dialog/PasswordConfirmationDialog';
import { toLocalMgCurrency } from '../../../utils/formatterUtilities';
import { HIDDEN_AMOUNT } from '../../../utils/Const';
import ProfileSkeleton from './components/Skeleton/ProfileSkeleton';
import InfoCard from './components/Card/InfoCard';
import SalaryEditDialog from './components/Dialog/SalaryEditDialog';

export default function Profile() {
  const { state, updateUserInfo } = useUserContext();

  const [editDialog, setEditDialog] = useState(false);

  const user = useMemo(() => {
    return state.profile;
  }, [state]);

  const { sensitiveDataVisibility, passwordDialog, hide, confirmPassword } =
    useTemporaryVisibility();

  const handleSalaryUpdate = useCallback(
    async (amount: number) => {
      const userProfile = state.profile;
      let updateSuccess = false;

      if (userProfile) {
        updateSuccess = await updateUserInfo({
          ...userProfile,
          salary: amount,
        });
      }

      if (updateSuccess) {
        setEditDialog(false);
      }

      return updateSuccess;
    },
    [state.profile, updateUserInfo]
  );

  return (
    <>
      <SalaryEditDialog
        isOpen={editDialog}
        onClose={() => {
          setEditDialog(false);
        }}
        initialData={0}
        onSubmit={handleSalaryUpdate}
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
                ${Colors.tint500} 0%,
                 ${Colors.tint700} 60%,
                ${Colors.tint900} 100%
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
              <Box sx={{ position: 'relative', display: 'inline-block' }}>
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  badgeContent={
                    <IconButton
                      size="small"
                      sx={{
                        bgcolor: 'background.paper',
                        '&:hover': { bgcolor: 'grey.100' },
                        boxShadow: 2,
                      }}
                    >
                      <Camera fontSize="small" />
                    </IconButton>
                  }
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
                </Badge>

                {/* Online status indicator - more prominent */}
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 8,
                    right: 8,
                    width: 16,
                    height: 16,
                    borderRadius: '50%',
                    bgcolor: Colors.A700,
                    border: '3px solid white',
                    boxShadow: 1,
                  }}
                />
              </Box>

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
                background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
                border: '1px solid',
                borderColor: 'primary.light',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: -50,
                  right: -50,
                  width: 100,
                  height: 100,
                  borderRadius: '50%',
                  background: 'rgba(25, 118, 210, 0.1)',
                },
              }}
            >
              <Stack spacing={2}>
                <Stack
                  direction="row"
                  sx={{
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ alignItems: 'center' }}
                  >
                    <AttachMoney color="primary" />
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 600 }}
                      color="primary.dark"
                    >
                      Salary
                    </Typography>
                  </Stack>
                  <Stack
                    direction="row"
                    spacing={0.5}
                  >
                    <Tooltip title="Edit salary">
                      <IconButton
                        size="small"
                        onClick={() => setEditDialog(true)}
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
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </Stack>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 800 }}
                  color="primary.dark"
                >
                  {sensitiveDataVisibility
                    ? toLocalMgCurrency(user.salary)
                    : HIDDEN_AMOUNT}
                </Typography>
              </Stack>
            </Paper>
          </Box>
        </Card>
      )}
    </>
  );
}

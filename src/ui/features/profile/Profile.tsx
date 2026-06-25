import {
  Avatar,
  Box,
  Card,
  Chip,
  Divider,
  Fade,
  Grid,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
  Zoom,
} from '@mui/material';
import { useUserContext } from '../../../contexts/auth/UserContext';
import {
  AttachMoney,
  Edit,
  EmailOutlined,
  PersonOutlined,
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
        <Fade
          in
          timeout={600}
        >
          <Card
            elevation={0}
            sx={{
              maxWidth: 880,
              mx: 'auto',
              overflow: 'visible',
              borderRadius: 5,
              border: '1px solid',
              borderColor: 'divider',
              position: 'relative',
            }}
          >
            {/* ── Header Banner ── */}
            <Box
              sx={{
                height: 200,
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '20px 20px 0 0',
                background: `
                  radial-gradient(
                    ellipse 70% 50% at 30% 20%,
                    rgba(255,255,255,0.15) 0%,
                    transparent 60%
                  ),
                  radial-gradient(
                    ellipse 50% 40% at 80% 80%,
                    ${Colors.A200}30 0%,
                    transparent 50%
                  ),
                  linear-gradient(
                    135deg,
                    ${Colors.tint400} 0%,
                    ${Colors.tint600} 40%,
                    ${Colors.tint800} 100%
                  )
                `,
              }}
            >
              {/* Decorative circles */}
              <Box
                sx={{
                  position: 'absolute',
                  top: -60,
                  right: -40,
                  width: 200,
                  height: 200,
                  borderRadius: '50%',
                  border: '2px solid rgba(255,255,255,0.12)',
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: -80,
                  left: '10%',
                  width: 160,
                  height: 160,
                  borderRadius: '50%',
                  border: '2px solid rgba(255,255,255,0.08)',
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  top: 30,
                  right: '25%',
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  bgcolor: 'rgba(255,255,255,0.3)',
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 40,
                  right: '15%',
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  bgcolor: 'rgba(255,255,255,0.2)',
                }}
              />
            </Box>

            {/* ── Avatar Section ── */}
            <Box
              sx={{
                px: { xs: 3, md: 5 },
                pb: 4,
                mt: '-64px',
                position: 'relative',
                zIndex: 1,
              }}
            >
              <Stack
                sx={{ alignItems: 'center' }}
                spacing={2}
              >
                {/* Avatar with ring */}
                <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                  {/* Outer glow ring */}
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: -6,
                      borderRadius: '50%',
                      background: `conic-gradient(${Colors.tint400}, ${Colors.A200}, ${Colors.tint600}, ${Colors.tint400})`,
                      opacity: 0.3,
                      filter: 'blur(8px)',
                    }}
                  />
                  <Avatar
                    src={user.pictureUrl}
                    alt={`${user.firstName} ${user.lastName}`}
                    sx={{
                      width: 128,
                      height: 128,
                      border: '4px solid white',
                      boxShadow: `
                        0 8px 32px rgba(0,0,0,0.12),
                        0 2px 8px rgba(0,0,0,0.06)
                      `,
                      position: 'relative',
                    }}
                  />
                  {/* Online indicator */}
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 10,
                      right: 10,
                      width: 18,
                      height: 18,
                      borderRadius: '50%',
                      bgcolor: Colors.A700,
                      border: '3px solid white',
                      boxShadow: `0 0 0 4px ${Colors.A700}30`,
                    }}
                  />
                </Box>

                {/* Name */}
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 800,
                    color: Colors.tint900,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {user.firstName} {user.lastName}
                </Typography>

                {/* Email */}
                <Stack
                  direction="row"
                  spacing={0.75}
                  sx={{ alignItems: 'center' }}
                >
                  <EmailOutlined
                    sx={{ fontSize: 18, color: 'text.secondary' }}
                  />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    {user.email}
                  </Typography>
                </Stack>

                {/* Status chip */}
                <Zoom
                  in
                  timeout={400}
                  style={{ transitionDelay: '200ms' }}
                >
                  <Chip
                    label="Active"
                    size="small"
                    variant="outlined"
                    color="success"
                    sx={{
                      fontWeight: 600,
                      fontSize: '0.75rem',
                      borderRadius: 2,
                      px: 0.5,
                    }}
                  />
                </Zoom>
              </Stack>

              <Divider sx={{ my: 4 }}>
                <Typography
                  variant="caption"
                  sx={{
                    px: 2,
                    color: 'text.disabled',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: 1.5,
                    fontSize: '0.7rem',
                  }}
                >
                  Details
                </Typography>
              </Divider>

              {/* ── Personal Information ── */}
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <PersonOutlined
                  fontSize="small"
                  sx={{ color: Colors.tint600 }}
                />
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

              {/* ── Financial Information ── */}
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 700,
                  mt: 4,
                  mb: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <AttachMoney
                  fontSize="small"
                  sx={{ color: Colors.tint600 }}
                />
                Financial Information
              </Typography>

              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  background: `
                    linear-gradient(
                      135deg,
                      ${Colors.tint50} 0%,
                      ${Colors.tint100}60 50%,
                      ${Colors.A100}30 100%
                    )
                  `,
                  border: '1px solid',
                  borderColor: `${Colors.tint200}80`,
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: Colors.tint300,
                    boxShadow: `0 4px 20px ${Colors.tint200}40`,
                  },
                }}
              >
                {/* Decorative accent */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: 4,
                    height: '100%',
                    background: `linear-gradient(180deg, ${Colors.tint500}, ${Colors.tint700})`,
                    borderRadius: '4px 0 0 4px',
                  }}
                />

                <Stack
                  spacing={2}
                  sx={{ pl: 1 }}
                >
                  {/* Header row */}
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
                      <Box
                        sx={{
                          width: 36,
                          height: 36,
                          borderRadius: 2.5,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          bgcolor: `${Colors.tint500}18`,
                        }}
                      >
                        <AttachMoney
                          sx={{ color: Colors.tint700, fontSize: 22 }}
                        />
                      </Box>
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 600 }}
                        color="text.secondary"
                      >
                        Monthly Salary
                      </Typography>
                    </Stack>

                    {/* Action buttons */}
                    <Stack
                      direction="row"
                      spacing={0.5}
                    >
                      <Tooltip title="Edit salary">
                        <IconButton
                          size="small"
                          onClick={() => setEditDialog(true)}
                          sx={{
                            color: Colors.tint600,
                            '&:hover': {
                              bgcolor: `${Colors.tint500}18`,
                            },
                          }}
                        >
                          <Edit fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip
                        title={
                          sensitiveDataVisibility
                            ? 'Hide salary'
                            : 'Show salary'
                        }
                      >
                        <IconButton
                          size="small"
                          onClick={hide}
                          sx={{
                            color: Colors.tint600,
                            '&:hover': {
                              bgcolor: `${Colors.tint500}18`,
                            },
                          }}
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

                  {/* Amount */}
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 800,
                      color: Colors.tint900,
                      letterSpacing: '-0.02em',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {sensitiveDataVisibility
                      ? toLocalMgCurrency(user.salary)
                      : HIDDEN_AMOUNT}
                  </Typography>
                </Stack>
              </Paper>
            </Box>
          </Card>
        </Fade>
      )}
    </>
  );
}

import {
  Box,
  CardContent,
  Divider,
  IconButton,
  Paper,
  Stack,
} from '@mui/material';
import { Gauge } from '@mui/x-charts';

import { useMemo, useState } from 'react';

import type { GasStatusInfo } from '../../../type/AppType';
import type { GasEventsDataProps } from '../../../type/PropsType';

import { AssignmentTurnedIn } from '@mui/icons-material';
import { generateGasStatusInfo } from '../../../utils/dataTransformUtilities';
import { formatStringDate } from '../../../utils/formatterUtilities';
import CustomCardHeader from '../../core/CustomCardHeader';
import InfoRow from '../../core/InfoRow';
import Colors from '../../Theming/Colors';
import AppDimensions from '../../Theming/Dimensions';
import { useSubmit } from 'react-router-dom';
import ConfirmationDialog from '../Dialog/ConfirmationDialog';

export default function GasStatus({ gasEvents }: GasEventsDataProps) {
  const submit = useSubmit();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const gasStatusInfo = useMemo<GasStatusInfo | null>(
    () => generateGasStatusInfo(gasEvents),
    [gasEvents]
  );

  const hasData = gasStatusInfo !== null;

  const handleConfirm = () => {
    const formData = new FormData();
    if (hasData) {
      formData.set('current_id', gasStatusInfo.current.id);
      formData.set('startDate', gasStatusInfo.current.startDate);
      formData.set('previous_id', gasStatusInfo.previous.id);
      submit(formData, { method: 'post', action: '/gas' });
      setIsDialogOpen(false);
    }
  };

  return (
    <>
      <ConfirmationDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleConfirm}
        onCancel={() => setIsDialogOpen(false)}
        message="Are you sure to mark current gas bottle as empty?"
      />
      <Paper
        elevation={1}
        sx={{ borderRadius: 2, minWidth: '40em' }}
      >
        <CustomCardHeader displayText="Current Gas Bottle Status" />
        {hasData && (
          <CardContent sx={{ position: 'relative' }}>
            <Stack
              direction={'row'}
              spacing={1}
            >
              <Stack
                sx={{
                  alignItems: 'center',
                  width: '20em',
                }}
                spacing={1}
              >
                <InfoRow
                  label="📆 In use since"
                  value={
                    gasStatusInfo.current?.startDate === undefined
                      ? ''
                      : formatStringDate(gasStatusInfo.current?.startDate)
                  }
                />
                <InfoRow
                  label="❌ Run out forecast on"
                  value={formatStringDate(gasStatusInfo.forecast)}
                />
                <InfoRow
                  label="ℹ️ Previous gas"
                  value={`${gasStatusInfo.previous?.totalDays} days`}
                />
                <Box
                  sx={{
                    width: '12rem',
                    height: '12rem',
                    backgroundColor: Colors.paperBackground,
                    borderRadius: AppDimensions.BorderRadius.medium,
                  }}
                >
                  <Gauge
                    value={gasStatusInfo.inUseDays}
                    valueMax={gasStatusInfo.previous?.totalDays}
                    sx={{
                      ['& .MuiGauge-valueText']: {
                        fontWeight: 'bold',
                      },
                      [`& .MuiGauge-valueArc`]: {
                        fill: gasStatusInfo.isOverForecast
                          ? Colors.errorLight
                          : 'primary.main',
                      },
                    }}
                    text={gasStatusInfo.gaugeText}
                  />
                </Box>
                <IconButton
                  size="large"
                  onClick={() => setIsDialogOpen(true)}
                  sx={{
                    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
                    color: 'primary.main',
                    position: 'absolute',
                    bottom: '2%',
                    right: '2%',
                  }}
                >
                  <AssignmentTurnedIn fontSize="inherit" />
                </IconButton>
              </Stack>
              <Divider
                variant="middle"
                flexItem
                orientation="vertical"
              />
              <Box
                sx={{
                  backgroundColor: Colors.tint50,
                  flexGrow: 1,
                  height: '16em',
                }}
              ></Box>
            </Stack>
          </CardContent>
        )}
      </Paper>
    </>
  );
}

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

import type {
  GasFormDialogData,
  GasStatusInfo,
} from '../../../../../type/AppType';

import { AssignmentTurnedIn } from '@mui/icons-material';
import { useGasEventsContext } from '../../../../../contexts/gasEvents/GasEventsContext';
import { generateGasStatusInfo } from '../../../../../utils/dataTransformUtilities';
import { formatStringDate } from '../../../../../utils/formatterUtilities';
import Colors from '../../../../Theming/Colors';
import AppDimensions from '../../../../Theming/Dimensions';
import GasFormDialog from '../Dialog/GasFormDialog';
import CustomCardHeader from '../../../shared/CustomCardHeader/CustomCardHeader';
import InfoRow from '../../../shared/InfoRow/InfoRow';

export default function GasStatus() {
  const { state, submit } = useGasEventsContext();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const gasStatusInfo = useMemo<GasStatusInfo | null>(
    () => generateGasStatusInfo(state.data),
    [state.data]
  );

  const hasData = gasStatusInfo !== null;

  const handleConfirm = (data: GasFormDialogData) => {
    submit(data);
    setIsDialogOpen(false);
  };

  return (
    <>
      <GasFormDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handleConfirm}
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
                      : formatStringDate(
                          gasStatusInfo.current?.startDate.toISOString()
                        )
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

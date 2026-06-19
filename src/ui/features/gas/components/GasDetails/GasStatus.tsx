import { Box, CardContent, IconButton, Skeleton, Stack } from '@mui/material';
import { Gauge } from '@mui/x-charts';

import { useMemo, useState } from 'react';

import type {
  GasFormDialogData,
  GasStatusInfo,
} from '../../../../../type/AppType';

import { AssignmentTurnedIn } from '@mui/icons-material';
import { useGasEventsContext } from '../../../../../contexts/gasEvents/GasEventsContext';
import { generateGasStatusInfo } from '../../../../../utils/dataGeneratorUtilities';
import { formatStringDate } from '../../../../../utils/formatterUtilities';
import Colors from '../../../../Theming/Colors';
import AppDimensions from '../../../../Theming/Dimensions';
import CustomPaper from '../../../shared/Container/CustomPaper';
import CustomCardHeader from '../../../shared/CustomCardHeader/CustomCardHeader';
import InfoRow from '../../../shared/InfoRow/InfoRow';
import GasFormDialog from '../Dialog/GasFormDialog';

const skeletonTextSx = { fontSize: '2rem', width: '100%' };

export default function GasStatus() {
  const { state, submit, load } = useGasEventsContext();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const gasStatusInfo = useMemo<GasStatusInfo | null>(
    () => generateGasStatusInfo(state.data),
    [state.data]
  );
  const hasData = gasStatusInfo !== null;

  const handleConfirm = async (data: GasFormDialogData) => {
    const result = await submit(data);
    setIsDialogOpen(false);

    if (result) {
      load();
    }

    return result;
  };

  return (
    <>
      <GasFormDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handleConfirm}
      />
      <CustomPaper
        sx={{
          borderRadius: 2,
        }}
      >
        <CustomCardHeader displayText="Current Gas Bottle Status" />
        {hasData ? (
          <CardContent sx={{ position: 'relative' }}>
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
          </CardContent>
        ) : (
          <Stack
            sx={{
              alignItems: 'center',
              width: '20em',
              px: 2,
            }}
            spacing={1}
          >
            <Skeleton
              variant="text"
              sx={skeletonTextSx}
            />
            <Skeleton
              variant="text"
              sx={skeletonTextSx}
            />
            <Skeleton
              variant="text"
              sx={skeletonTextSx}
            />
            <Skeleton
              variant="circular"
              width={150}
              height={150}
            />
          </Stack>
        )}
      </CustomPaper>
    </>
  );
}

import { Badge, Box, Paper, Typography } from '@mui/material';
import { DateCalendar, LocalizationProvider, PickerDay } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { memo, useMemo } from 'react';
import type { CalendarDayProps, CalendarProps } from '../../../type/PropsType';
import { generateGasEventData } from '../../../utils/utilities';
import Colors from '../../Theming/Colors';

export default function Calendar({ gasEvents }: CalendarProps) {
  const gasEventData = useMemo(() => generateGasEventData(gasEvents), [gasEvents]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Paper
        elevation={1}
        sx={{
          width: 320,
          borderRadius: 3,
        }}
      >
        <Box
          sx={{
            textAlign: 'center',
            backgroundColor: 'primary.dark',
            color: Colors.tint50,
            py: 1,
            borderRadius: '0.6em 0.6em 0 0',
          }}
        >
          <Typography variant='h6'>
            Forecast date: {gasEventData.forecastedDate ?? 'N/A'}
          </Typography>
        </Box>
        <DateCalendar
          slots={{ day: DayCell }}
          showDaysOutsideCurrentMonth
          slotProps={{ day: { gasEventData } as CalendarDayProps }}
        />
      </Paper>
    </LocalizationProvider>
  );
}

const DayCell = memo(function (props: CalendarDayProps) {
  const { gasEventData, day, today, ...other } = props;

  const currentDay = useMemo(() => day.format('YYYY-MM-DD'), [day]);

  const getBadge = () => {
    if (gasEventData?.startDates.has(currentDay)) {
      return '⛽';
    } else if (gasEventData?.forecastedDate === currentDay) {
      return '📅';
    }
    return undefined;
  };

  return (
    <Badge overlap='circular' badgeContent={getBadge()}>
      <PickerDay
        sx={{
          ...(today && {
            backgroundColor: Colors.A100,
            color: Colors.limeDark,
            fontWeight: 'bold',
          }),
        }}
        {...other}
        day={day}
      />
    </Badge>
  );
});

import { Badge, Paper } from '@mui/material';
import {
  DateCalendar,
  LocalizationProvider,
  PickerDay,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { memo, useMemo } from 'react';
import { useGasEventsContext } from '../../../contexts/gasEvents/GasEventsContext';
import type { CalendarDayProps } from '../../../type/PropsType';
import { generateGasEventData } from '../../../utils/dataTransformUtilities';
import Colors from '../../Theming/Colors';
import CustomCardHeader from '../../core/CustomCardHeader';
import { formatStringDate } from '../../../utils/formatterUtilities';
import dayjs from 'dayjs';

export default function Calendar() {
  const { state } = useGasEventsContext();
  const gasEventData = useMemo(
    () => generateGasEventData(state.data),
    [state.data]
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Paper
        elevation={1}
        sx={{
          width: 320,
          borderRadius: 3,
        }}
      >
        <CustomCardHeader
          displayText={`Forecast date: ${formatStringDate(gasEventData.forecastedDate!) ?? 'N/A'}`}
        />
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
  const currentDay = useMemo(() => dayjs(day).format('YYYY-MM-DD'), [day]);

  const getBadge = () => {
    if (gasEventData?.startDates.has(currentDay)) {
      return '⛽';
    } else if (gasEventData?.forecastedDate === currentDay) {
      return '📅';
    }
    return undefined;
  };

  return (
    <Badge
      overlap="circular"
      badgeContent={getBadge()}
    >
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

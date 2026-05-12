import { Badge, Box, Paper, Typography } from '@mui/material';
import {
  DateCalendar,
  LocalizationProvider,
  PickerDay,
  type PickerDayProps,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Colors from '../../Theming/Colors';
import type { CalendarDayProps, CalendarProps } from '../../../type/PropsType';

export default function Calendar({ forecastDate }: CalendarProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Paper
        elevation={3}
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
          <Typography variant='h6'>Forecast date: {forecastDate.format('dddd, MMMM D')}</Typography>
        </Box>
        <DateCalendar
          slots={{ day: DayCell }}
          slotProps={{
            day: {
              highlightedDays: ['2026-05-18'],
            } as CalendarDayProps,
          }}
        />
      </Paper>
    </LocalizationProvider>
  );
}

function DayCell(props: PickerDayProps & { highlightedDays?: string[] }) {
  const { highlightedDays = [], day, outsideCurrentMonth, today, ...other } = props;

  const isSelected = highlightedDays.includes(day.format('YYYY-MM-DD'));

  return (
    <Badge
      key={props.day.toString()}
      overlap='circular'
      badgeContent={isSelected ? '📌' : undefined}
    >
      <PickerDay
        sx={{
          ...(today && {
            backgroundColor: Colors.A100,
            color: Colors.limeDark,
            borderRadius: '50%',
            fontWeight: 'bold',
          }),
        }}
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
      />
    </Badge>
  );
}

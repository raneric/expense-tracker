import { EditSquare } from '@mui/icons-material';
import { Badge, Button, Popover, Typography } from '@mui/material';
import {
  DateCalendar,
  LocalizationProvider,
  PickerDay,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { memo, useMemo, useState } from 'react';
import { useGasEventsContext } from '../../../../../contexts/gasEvents/GasEventsContext';
import type { CalendarDayProps } from '../../../../../type/PropsType';
import { generateGasEventData } from '../../../../../utils/dataGeneratorUtilities';
import { formatStringDate } from '../../../../../utils/formatterUtilities';
import Colors from '../../../../Theming/Colors';
import CustomPaper from '../../../shared/Container/CustomPaper';
import CustomCardHeader from '../../../shared/CustomCardHeader/CustomCardHeader';

export default function Calendar({
  onDayCellClick,
}: {
  onDayCellClick: (date: string) => void;
}) {
  const { state } = useGasEventsContext();
  const gasEventData = useMemo(
    () => generateGasEventData(state.data),
    [state.data]
  );
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <CustomPaper
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
          slotProps={{
            day: { gasEventData, onDayCellClick } as CalendarDayProps,
          }}
        />
      </CustomPaper>
    </LocalizationProvider>
  );
}

const DayCell = memo(function (props: CalendarDayProps) {
  const { gasEventData, day, today, onDayCellClick, ...other } = props;
  const currentDay = useMemo(() => dayjs(day).format('YYYY-MM-DD'), [day]);

  const getBadge = () => {
    if (gasEventData?.startDates.has(currentDay)) {
      return '⛽';
    } else if (gasEventData?.forecastedDate === currentDay) {
      return '📅';
    }
    return undefined;
  };

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const hasEvent = gasEventData?.startDates.has(currentDay);

  const handleMouseEnter = (eventTarget: React.MouseEvent<HTMLElement>) => {
    if (hasEvent) {
      setAnchorEl(eventTarget.currentTarget);
    }
  };

  const handleMouseLeave = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Badge
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleMouseLeave}
        sx={{ padding: 0 }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        disableRestoreFocus
        slotProps={{
          paper: {
            onMouseEnter: () => {},
            onMouseLeave: handleMouseLeave,
            sx: {
              px: 1,
              py: 0,
            },
          },
        }}
      >
        {hasEvent && open && (
          <Button
            startIcon={<EditSquare />}
            variant="text"
            size="small"
            onClick={() => {
              onDayCellClick?.(day.toISOString());
            }}
          >
            <Typography variant="body2">Edit</Typography>
          </Button>
        )}
      </Popover>
    </Badge>
  );
});

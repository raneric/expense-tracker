import {
  Dialog,
  DialogContent,
  Divider,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { useWithdrawalContext } from '../../../../contexts/withdrawalsRetrieval/WithdrawalContext';
import type { DialogProps } from '../../../../type/PropsType';
import type { FilterType } from '../../../../type/StateContextType';
import {
  getDefaultDateFilterRange,
  getPreviousDateFilterRange,
  getCurrentWeekFilterRange,
  getPreviousWeekFilterRange,
} from '../../../../utils/dataGeneratorUtilities';
import { formatDateInput } from '../../../../utils/formatterUtilities';
import DialogHeader from './DialogHeader';

type Period = 'month' | 'week';

const monthFilterOptions: Array<{ value: FilterType; label: string }> = [
  { value: 'previous', label: 'Previous' },
  { value: 'current', label: 'Current' },
  { value: 'custom', label: 'Custom' },
];

const weekFilterOptions: Array<{ value: FilterType; label: string }> = [
  { value: 'previous-week', label: 'Previous' },
  { value: 'current-week', label: 'Current' },
  { value: 'custom', label: 'Custom' },
];

function resolvePeriod(filterType: FilterType): Period {
  return filterType === 'current-week' || filterType === 'previous-week'
    ? 'week'
    : 'month';
}

export default function FilterDialog({ isOpen, onClose }: DialogProps) {
  const { filterBy, state } = useWithdrawalContext();
  const { filter } = state;
  const isCustom = filter.type === 'custom';
  const period = resolvePeriod(filter.type);

  const updateFilter = async (updatedFields: Partial<typeof filter>) => {
    await filterBy({ ...filter, ...updatedFields });
  };

  const handlePeriodChange = async (
    _event: React.MouseEvent<HTMLElement>,
    newPeriod: Period | null
  ) => {
    if (!newPeriod) return;

    if (newPeriod === 'month') {
      await filterBy(getDefaultDateFilterRange());
    } else {
      await filterBy(getCurrentWeekFilterRange());
    }
  };

  const handleRadioChange = async (
    event: React.ChangeEvent<HTMLInputElement, Element>
  ) => {
    const selected = event.target.value as FilterType;

    if (selected === 'current') {
      await filterBy(getDefaultDateFilterRange());
      return;
    }

    if (selected === 'previous') {
      await filterBy(getPreviousDateFilterRange());
      return;
    }

    if (selected === 'current-week') {
      await filterBy(getCurrentWeekFilterRange());
      return;
    }

    if (selected === 'previous-week') {
      await filterBy(getPreviousWeekFilterRange());
      return;
    }

    updateFilter({ type: 'custom' });
  };

  const handleDateChange =
    (field: 'startDate' | 'endDate') =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      updateFilter({ [field]: new Date(event.target.value), type: 'custom' });
    };

  const filterOptions =
    period === 'month' ? monthFilterOptions : weekFilterOptions;

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
    >
      <DialogHeader>
        <span>Select date range</span>
      </DialogHeader>

      <DialogContent sx={{ maxWidth: '29em', marginTop: 2 }}>
        <ToggleButtonGroup
          value={period}
          exclusive
          onChange={handlePeriodChange}
          aria-label="filter period"
          size="small"
          fullWidth
          sx={{ mb: 2 }}
        >
          <ToggleButton value="month">Month</ToggleButton>
          <ToggleButton value="week">Week</ToggleButton>
        </ToggleButtonGroup>

        <FormControl fullWidth>
          <RadioGroup
            row
            value={filter.type}
            aria-labelledby="filter-label"
            name="row-radio-buttons-group"
            onChange={handleRadioChange}
            sx={{ justifyContent: 'center' }}
          >
            {filterOptions.map(({ value, label }) => (
              <FormControlLabel
                key={value}
                value={value}
                control={<Radio />}
                label={label}
              />
            ))}
          </RadioGroup>
        </FormControl>

        <Divider />

        <TextField
          disabled={!isCustom}
          label="Start Date"
          type="date"
          value={formatDateInput(filter.startDate)}
          onChange={handleDateChange('startDate')}
          fullWidth
          margin="normal"
          slotProps={{ inputLabel: { shrink: true } }}
        />

        <TextField
          disabled={!isCustom}
          label="End Date"
          type="date"
          value={formatDateInput(filter.endDate)}
          onChange={handleDateChange('endDate')}
          fullWidth
          margin="normal"
          slotProps={{ inputLabel: { shrink: true } }}
        />
      </DialogContent>
    </Dialog>
  );
}

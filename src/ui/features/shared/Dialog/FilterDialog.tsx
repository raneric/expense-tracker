import {
  Dialog,
  DialogContent,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import { useWithdrawalContext } from '../../../../contexts/withdrawalsRetrieval/WithdrawalContext';
import type { DialogProps } from '../../../../type/PropsType';
import type { FilterType } from '../../../../type/StateContextType';
import {
  getDefaultDateFilterRange,
  getPreviousDateFilterRange,
} from '../../../../utils/dataGeneratorUtilities';
import { formatDateInput } from '../../../../utils/formatterUtilities';
import DialogHeader from './DialogHeader';

const filterOptions: Array<{ value: FilterType; label: string }> = [
  { value: 'previous', label: 'Previous' },
  { value: 'current', label: 'Current' },
  { value: 'custom', label: 'Custom' },
];

export default function FilterDialog({ isOpen, onClose }: DialogProps) {
  const { filterBy, state } = useWithdrawalContext();
  const { filter } = state;
  const isCustom = filter.type === 'custom';

  const updateFilter = (updatedFields: Partial<typeof filter>) => {
    filterBy({ ...filter, ...updatedFields });
  };

  const handleRadioChange = (
    event: React.ChangeEvent<HTMLInputElement, Element>
  ) => {
    const selected = event.target.value as FilterType;

    if (selected === 'current') {
      filterBy(getDefaultDateFilterRange());
      return;
    }

    if (selected === 'previous') {
      filterBy(getPreviousDateFilterRange());
      return;
    }

    updateFilter({ type: 'custom' });
  };

  const handleDateChange =
    (field: 'startDate' | 'endDate') =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      updateFilter({ [field]: new Date(event.target.value), type: 'custom' });
    };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
    >
      <DialogHeader>
        <span>Select date range</span>
      </DialogHeader>

      <DialogContent sx={{ maxWidth: '26em', marginTop: 2 }}>
        <FormControl>
          <FormLabel id="filter-label">Month</FormLabel>
          <RadioGroup
            row
            value={filter.type}
            aria-labelledby="filter-label"
            name="row-radio-buttons-group"
            onChange={handleRadioChange}
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

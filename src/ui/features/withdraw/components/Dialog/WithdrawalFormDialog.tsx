import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  Fade,
  IconButton,
  InputAdornment,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

import { useCallback, useMemo, useState } from 'react';
import type { Withdrawal, WithdrawalDetail } from '../../../../../type/AppType';
import type { WithdrawalDialogFormProps } from '../../../../../type/PropsType';
import { initialWithdrawal } from '../../../../../utils/Const';
import DialogHeader from '../../../shared/Dialog/DialogHeader';
import {
  formatDateForInput,
  isFutureDate,
} from '../../../../../utils/validationUtilities';

const INITIAL_WITHDRAWAL: Withdrawal = initialWithdrawal;

const EMPTY_DETAIL: WithdrawalDetail = { reason: '', price: 0 };

interface TabPanelProps {
  children: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      sx={{ pt: 2 }}
    >
      {value === index && children}
    </Box>
  );
}

/**
 * A form for adding or editing withdrawal information.
 * @param props - The properties for the AddWithdrawForm component.
 * @returns A React component that renders a form for adding or editing withdrawal information.
 */
export default function WithdrawalFormDialog({
  isOpen,
  initialData,
  reasonsList,
  onClose,
  onSubmit,
  submitInProgress,
}: WithdrawalDialogFormProps) {
  const [formData, setFormData] = useState<Withdrawal>(() => ({
    ...initialWithdrawal,
    ...initialData,
    details: initialData?.details ?? [],
  }));

  const [activeTab, setActiveTab] = useState(0);

  const errors = useMemo(() => {
    return {
      reasons:
        formData.reasons.length === 0 ? 'At least one reason is required' : '',

      amount: formData.amount < 0 ? 'Amount must be greater or equal to 0' : '',
    };
  }, [formData]);

  const details = formData.details ?? [];
  const detailsCount = details.length;

  const hasErrors = Boolean(errors.reasons || errors.amount);

  const handleChange = useCallback(
    <K extends keyof Withdrawal>(key: K, value: Withdrawal[K]) => {
      setFormData((prev) => {
        const updated = {
          ...prev,
          [key]: value,
        };

        if (key === 'date') {
          updated.isForecast = isFutureDate(value as Date);
        }

        return updated;
      });
    },
    []
  );

  const handleAmountChange = useCallback(
    (value: string) => {
      const parsed = parseFloat(value);

      handleChange('amount', Number.isNaN(parsed) ? 0 : parsed);
    },
    [handleChange]
  );

  const handleDetailChange = useCallback(
    (index: number, field: keyof WithdrawalDetail, value: string | number) => {
      setFormData((prev) => {
        const updatedDetails = [...prev.details];
        updatedDetails[index] = {
          ...updatedDetails[index],
          [field]:
            field === 'price'
              ? Number.isNaN(Number(value))
                ? 0
                : Number(value)
              : value,
        };
        return { ...prev, details: updatedDetails };
      });
    },
    []
  );

  const handleAddDetail = useCallback(() => {
    setFormData((prev) => {
      const hasReasons = prev.reasons.length > 0;
      const hasNoDetails = prev.details.length === 0;

      if (hasReasons && hasNoDetails) {
        return {
          ...prev,
          details: prev.reasons.map((reason) => ({ reason, price: 0 })),
        };
      }

      return {
        ...prev,
        details: [...prev.details, { ...EMPTY_DETAIL }],
      };
    });
  }, []);

  const handleRemoveDetail = useCallback((index: number) => {
    setFormData((prev) => ({
      ...prev,
      details: prev.details.filter((_, i) => i !== index),
    }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData(INITIAL_WITHDRAWAL);
    setActiveTab(0);
  }, []);

  const handleSubmit = useCallback(
    async (e: React.SubmitEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (hasErrors) return;

      const result = await onSubmit(formData);

      if (result) {
        resetForm();
      }
    },
    [formData, hasErrors, onSubmit, resetForm]
  );

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogHeader>
        <span>Withdrawal info</span>
        <Fade in={formData.isForecast}>
          <Chip
            color="secondary"
            label="🕑 Forecast"
          />
        </Fade>
      </DialogHeader>

      <Tabs
        value={activeTab}
        onChange={(_, newValue) => setActiveTab(newValue)}
        sx={{ borderBottom: 1, borderColor: 'divider', px: 3 }}
      >
        <Tab label="General" />
        <Tab label={`Details${detailsCount > 0 ? ` (${detailsCount})` : ''}`} />
      </Tabs>

      <DialogContent>
        <Box
          component="form"
          method="post"
          onSubmit={handleSubmit}
        >
          <TabPanel
            value={activeTab}
            index={0}
          >
            <Autocomplete
              multiple
              freeSolo
              options={reasonsList}
              value={formData.reasons}
              onChange={(_, newValue) => handleChange('reasons', newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  margin="normal"
                  label="Reasons"
                  placeholder="Select reasons"
                  error={Boolean(errors.reasons)}
                  helperText={errors.reasons}
                />
              )}
            />

            <TextField
              label="Date"
              type="date"
              value={formatDateForInput(formData.date)}
              onChange={(e) => handleChange('date', new Date(e.target.value))}
              fullWidth
              margin="normal"
            />

            <TextField
              label="Location / Source"
              value={formData.location}
              onChange={(e) => handleChange('location', e.target.value)}
              fullWidth
              margin="normal"
            />

            <TextField
              label="Amount"
              type="number"
              value={formData.amount}
              onChange={(e) => handleAmountChange(e.target.value)}
              fullWidth
              margin="normal"
              error={Boolean(errors.amount)}
              helperText={errors.amount}
              slotProps={{
                htmlInput: {
                  min: 0,
                  step: 0.01,
                },
                input: {
                  endAdornment: (
                    <InputAdornment position="end">Ar</InputAdornment>
                  ),
                },
              }}
            />

            <TextField
              fullWidth
              value={formData.comments}
              label="Description"
              margin="normal"
              onChange={(e) => handleChange('comments', e.target.value)}
              multiline
              rows={4}
            />
          </TabPanel>

          <TabPanel
            value={activeTab}
            index={1}
          >
            {detailsCount === 0 ? (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textAlign: 'center', py: 4 }}
              >
                No details added yet. Click the button below to add a reason
                with its price.
              </Typography>
            ) : (
              <Stack spacing={2}>
                {details.map((detail, index) => (
                  <Stack
                    key={index}
                    direction="row"
                    spacing={1}
                    sx={{ alignItems: 'flex-start' }}
                  >
                    <TextField
                      label="Reason"
                      value={detail.reason}
                      onChange={(e) =>
                        handleDetailChange(index, 'reason', e.target.value)
                      }
                      fullWidth
                      size="small"
                    />
                    <TextField
                      label="Price"
                      type="number"
                      value={detail.price}
                      onChange={(e) =>
                        handleDetailChange(index, 'price', e.target.value)
                      }
                      size="small"
                      slotProps={{
                        htmlInput: {
                          min: 0,
                          step: 0.01,
                        },
                        input: {
                          endAdornment: (
                            <InputAdornment position="end">Ar</InputAdornment>
                          ),
                        },
                      }}
                    />
                    <IconButton
                      onClick={() => handleRemoveDetail(index)}
                      color="error"
                      sx={{ mt: 0.5 }}
                      aria-label={`Remove detail ${index + 1}`}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                ))}
              </Stack>
            )}

            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={handleAddDetail}
              fullWidth
              sx={{ mt: 2 }}
            >
              Add detail
            </Button>
          </TabPanel>

          <Stack
            spacing={2}
            direction="row"
            sx={{ mt: 3 }}
          >
            <Button
              variant="contained"
              onClick={resetForm}
              color="error"
              fullWidth
            >
              Reset
            </Button>

            <Button
              loading={submitInProgress}
              variant="contained"
              type="submit"
              disabled={hasErrors}
              fullWidth
            >
              Submit
            </Button>
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

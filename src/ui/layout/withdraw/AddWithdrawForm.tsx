import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useState } from "react";
import WithdrawRepository from "../../../repositories/WithdrawRepository";

type DialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AddWithdrawForm({ isOpen, onClose }: DialogProps) {
  const [reason, setReason] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [amount, setAmount] = useState("");
  const [amountError, setAmountError] = useState(false);

  const handleSubmit = () => {
    // Handle form submission here
    const repo = new WithdrawRepository();
    repo.getAll();
    console.log({ reason, location, date, amount });
    onClose();
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(value);
    if (value === "" || (!isNaN(Number(value)) && !isNaN(parseFloat(value)))) {
      setAmountError(false);
    } else {
      setAmountError(true);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onClose={onClose}>
        <DialogTitle>Add Withdraw</DialogTitle>
        <DialogContent>
          <TextField
            label="Reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Amount"
            type="text"
            value={amount}
            onChange={handleAmountChange}
            fullWidth
            margin="normal"
            error={amountError}
            helperText={amountError ? "Please enter a valid number" : ""}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">Ar</InputAdornment>
                ),
              },
            }}
          />
          <Button variant="contained" onClick={handleSubmit} fullWidth>
            Submit
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}

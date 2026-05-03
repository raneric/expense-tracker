import { Dialog } from "@mui/material";

type DialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AddWithdrawForm({ isOpen, onClose }: DialogProps) {
  return (
    <>
      <Dialog open={isOpen} onClose={onClose}>
        <h1>Dialog</h1>
      </Dialog>
    </>
  );
}

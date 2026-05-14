import { Alert, Snackbar } from "@mui/material";
import { useSnackbarContext } from "../../../contexts/snackbar/SnackbarContext";

export default function GlobalSnackbar() {
  const { state, hide } = useSnackbarContext();
  return (
    <Snackbar open={state.isDisplayed} autoHideDuration={5000} onClose={hide}>
      <Alert severity={state.severity} variant="filled" sx={{ width: "100%" }}>
        {state.message}
      </Alert>
    </Snackbar>
  );
}

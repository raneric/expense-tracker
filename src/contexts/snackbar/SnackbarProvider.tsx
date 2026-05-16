import { useReducer } from "react";
import type { BasePropsType } from "../../type/PropsType";
import { SnackbarContext } from "./SnackbarContext";
import { snackbarReducer } from "./snackbarReducer";
import type { AlertColor } from "@mui/material";
import type { SnackbarState } from "../../type/StateContextType";

const initialState: SnackbarState = {
  isDisplayed: false,
  message: null,
  severity: "error",
};

export const SnackbarProvider = ({ children }: BasePropsType) => {
  const [state, dispatch] = useReducer(snackbarReducer, initialState);

  const show = async (message: string, severity: AlertColor) => {
    if (message && severity) {
      dispatch({
        type: "OPEN",
        payload: { isDisplayed: true, message, severity },
      });
    }
  };

  const hide = async () => {
    dispatch({
      type: "CLOSED",
    });
  };

  return (
    <SnackbarContext.Provider value={{ state, show, hide }}>
      {children}
    </SnackbarContext.Provider>
  );
};

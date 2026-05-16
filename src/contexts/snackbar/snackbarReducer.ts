import type {
  SnackbarAction,
  SnackbarState,
} from "../../type/StateContextType";

export const snackbarReducer = (
  state: SnackbarState,
  action: SnackbarAction
): SnackbarState => {
  switch (action.type) {
    case "OPEN":
      return { ...state, ...action.payload };
    case "CLOSED":
      return { isDisplayed: false, message: null, severity: "info" };
  }
};

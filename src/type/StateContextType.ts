import type { AlertColor } from "@mui/material";
import type { LoginCredentials, User } from "./AppType";

// ------------------ Auth Context ----------------------------
export type UserAction =
  | { type: "LOGIN_START" }
  | { type: "LOGIN_SUCCESS"; payload: User }
  | { type: "LOGIN_FAILURE"; payload: string }
  | { type: "LOGOUT" };

export interface UserContextType {
  state: AuthState;
  dispatch: React.Dispatch<UserAction>;
  login: (user: LoginCredentials) => void;
  logout: () => void;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

//---------------------- Snackbar Context ------------------------
export interface SnackbarState {
  isDisplayed: boolean;
  message: string | null;
  severity: AlertColor;
}

export interface SnackbarContextType {
  state: SnackbarState;
  show: (message: string, severity: AlertColor) => void;
  hide: () => void;
}

export type SnackbarAction =
  | { type: "OPEN"; payload: SnackbarState }
  | { type: "CLOSED" };

//---------------------- Dialog context --------------------------
export interface DialogState {
  isOpen: boolean;
}

export interface DialogContextType {
  state: DialogState;
  show: () => void;
  hide: () => void;
}

export type DialogAction = { type: "OPEN" } | { type: "CLOSED" };

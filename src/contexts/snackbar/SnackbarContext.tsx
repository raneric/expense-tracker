import { createContext, useContext } from "react";
import type { SnackbarContextType } from "../../type/AppType";

export const SnackbarContext = createContext<SnackbarContextType | null>(null);

export const useSnackbarContext = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};

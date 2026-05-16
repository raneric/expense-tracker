import { useReducer } from "react";
import type { BasePropsType } from "../../type/PropsType";
import { dialogReducer } from "./dialogReducer";
import { DialogContext } from "./DialogContext";

export const DialogProvider = ({ children }: BasePropsType) => {
  const [state, dispatch] = useReducer(dialogReducer, { isOpen: false });

  const show = () => {
    dispatch({ type: "OPEN" });
  };
  const hide = () => {
    dispatch({ type: "CLOSED" });
  };
  return (
    <DialogContext.Provider value={{ state, show, hide }}>
      {children}
    </DialogContext.Provider>
  );
};

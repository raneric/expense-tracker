import { useEffect, useReducer } from "react";
import { signInWithFirebase, signOutFromFirebase } from "../../services/auth";
import type { User, LoginCredentials, AuthState } from "../../type/AppType";
import type { BasePropsType } from "../../type/PropsType";
import { users } from "../../utils/Const";
import { authReducer } from "./authReducer";
import { UserContext } from "./UserContext";
import { useSnackbarContext } from "../snackbar/SnackbarContext";
import type { FirebaseError } from "firebase/app";
import {
  clearStoredUser,
  getStoredUserEmail,
  storeUserEmail,
} from "../../utils/localStorageUtilities";

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

export const UserProvider = ({ children }: BasePropsType) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const { show } = useSnackbarContext();

  useEffect(() => {
    const storedUser = getStoredUserEmail();
    if (storedUser) {
      const user: User = users[0];
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: user,
      });
    }
  }, []);

  const login = async (user: LoginCredentials) => {
    dispatch({ type: "LOGIN_START" });

    const signInResult = await signInWithFirebase(user);

    if (signInResult.success && signInResult.data) {
      const user = signInResult.data;
      storeUserEmail(user.email);
      dispatch({ type: "LOGIN_SUCCESS", payload: user });
      show("Successfuly loged in", "success");
    } else if (!signInResult.success && signInResult.errorMessage) {
      dispatch({ type: "LOGIN_FAILURE", payload: signInResult.errorMessage });
      show(signInResult.errorMessage, "error");
    }
  };

  const logout = async () => {
    try {
      await signOutFromFirebase();
      dispatch({ type: "LOGOUT" });
      clearStoredUser();
    } catch (error) {
      show((error as FirebaseError).message, "error");
    }
  };

  return (
    <UserContext.Provider value={{ state, dispatch, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

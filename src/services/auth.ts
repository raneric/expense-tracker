import type { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { firebaseAuth } from "../config/firebase";
import type { RequestResult, User, LoginCredentials } from "../type/AppType";
import { AuthError } from "./AuthError";

export async function signInWithFirebase(
  credentials: LoginCredentials
): Promise<RequestResult<User>> {
  const { email, password } = credentials;

  if (!email) {
    return {
      success: false,
      errorMessage: "Email is required",
      errorCode: "INVALID_EMAIL",
    };
  }

  if (!credentials.password) {
    return {
      success: false,
      errorMessage: "Password is required",
      errorCode: "INVALID_PASSWORD",
    };
  }

  try {
    const signInResult = await signInWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );

    const user: User = {
      id: signInResult.user.uid,
      email: signInResult.user.email!,
    };

    return {
      success: true,
      data: user,
    };
  } catch (error) {
    return {
      success: false,
      errorMessage: (error as FirebaseError).message,
      errorCode: (error as FirebaseError).code,
    };
  }
}

export const signOutFromFirebase = async (): Promise<void> => {
  try {
    await signOut(firebaseAuth);
  } catch (error: unknown) {
    throw new AuthError((error as FirebaseError).message, undefined);
  }
};

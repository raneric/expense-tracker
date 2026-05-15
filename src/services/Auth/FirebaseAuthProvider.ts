import type { FirebaseError } from 'firebase/app';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { firebaseAuth } from '../../config/firebase';
import type { LoginCredentials, User } from '../../type/AppType';
import { AuthError } from './AuthError';
import type AuthProvider from './AuthProvider';

export default class FirebaseAuthProvider implements AuthProvider {
  async signIn(credentials: LoginCredentials) {
    const { email, password } = credentials;

    if (!email) {
      return {
        success: false,
        errorMessage: 'Email is required',
        errorCode: 'INVALID_EMAIL',
      };
    }

    if (!credentials.password) {
      return {
        success: false,
        errorMessage: 'Password is required',
        errorCode: 'INVALID_PASSWORD',
      };
    }

    try {
      const signInResult = await signInWithEmailAndPassword(firebaseAuth, email, password);

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

  async logout() {
    try {
      await signOut(firebaseAuth);
    } catch (error: unknown) {
      throw new AuthError((error as FirebaseError).message, undefined);
    }
  }
}

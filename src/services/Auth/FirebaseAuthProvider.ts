import type { FirebaseError } from 'firebase/app';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { firebaseAuth } from '../../config/firebase';
import type { LoginCredentials } from '../../type/AppType';
import { validateCredentials } from '../../utils/validationUtilities';
import { AuthError } from './AuthError';
import type AuthProvider from './AuthProvider';
import { mapFirebaseUser } from '../../utils/dataMappers';

export default class FirebaseAuthProvider implements AuthProvider {
  async signIn(credentials: LoginCredentials) {
    validateCredentials(credentials);
    const signInResult = await signInWithEmailAndPassword(
      firebaseAuth,
      credentials.email,
      credentials.password
    );
    return mapFirebaseUser(signInResult.user);
  }

  async logout() {
    try {
      await signOut(firebaseAuth);
    } catch (error: unknown) {
      throw new AuthError((error as FirebaseError).message, undefined);
    }
  }
}

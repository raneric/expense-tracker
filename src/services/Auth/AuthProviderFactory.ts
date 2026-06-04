import type AuthProvider from './AuthProvider';
import FirebaseAuthProvider from './FirebaseAuthProvider';

export default class AuthProviderFactory {
  private static authProviderInstance: AuthProvider;

  public static createAuthService() {
    if (!AuthProviderFactory.authProviderInstance) {
      AuthProviderFactory.authProviderInstance = new FirebaseAuthProvider();
    }
    return AuthProviderFactory.authProviderInstance;
  }
}

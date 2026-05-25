import type AuthProvider from './AuthProvider';
import FirebaseAuthProvider from './FirebaseAuthProvider';
import MockAuthProvider from './MockAuthProvider';

export default class AuthProviderFactory {
  private static authProviderInstance: AuthProvider;

  public static createAuthService(useMock: boolean = false) {
    if (!AuthProviderFactory.authProviderInstance) {
      const provider = useMock
        ? new MockAuthProvider()
        : new FirebaseAuthProvider();
      AuthProviderFactory.authProviderInstance = provider;
    }
    return AuthProviderFactory.authProviderInstance;
  }
}

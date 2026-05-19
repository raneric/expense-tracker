import { AuthService } from './AuthService';
import MockAuthProvider from './MockAuthProvider';

export default class AuthServiceFactory {
  private static authServiceInstance: AuthService;

  public static createAuthService() {
    if (!AuthServiceFactory.authServiceInstance) {
      if (import.meta.env.DEV) {
        AuthServiceFactory.authServiceInstance = new AuthService(
          new MockAuthProvider()
        );
      } else {
        AuthServiceFactory.authServiceInstance = new AuthService(
          new MockAuthProvider()
        );
      }
    }
    return AuthServiceFactory.authServiceInstance;
  }
}

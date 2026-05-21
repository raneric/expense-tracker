import { AuthService } from './AuthService';
import FirebaseAuthProvider from './FirebaseAuthProvider';

export default class AuthServiceFactory {
  private static authServiceInstance: AuthService;

  public static createAuthService() {
    if (!AuthServiceFactory.authServiceInstance) {
      AuthServiceFactory.authServiceInstance = new AuthService(
        new FirebaseAuthProvider()
      );
    }
    return AuthServiceFactory.authServiceInstance;
  }
}

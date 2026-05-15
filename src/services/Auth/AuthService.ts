import type { LoginCredentials } from '../../type/AppType';
import type AuthProvider from './AuthProvider';
import FirebaseAuthProvider from './FirebaseAuthProvider';

export class AuthService {
  private authProvider: AuthProvider;
  static instance: AuthService;

  private constructor(authProvider: AuthProvider) {
    this.authProvider = authProvider;
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService(new FirebaseAuthProvider());
    }
    return AuthService.instance;
  }

  public async signIn(user: LoginCredentials) {
    return await this.authProvider.signIn(user);
  }

  public async logout() {
    await this.authProvider.logout();
  }
}

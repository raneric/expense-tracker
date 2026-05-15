import type { LoginCredentials } from '../../type/AppType';
import type AuthProvider from './AuthProvider';

export class AuthService {
  private readonly authProvider: AuthProvider;
  constructor(authProvider: AuthProvider) {
    this.authProvider = authProvider;
  }

  public async signIn(user: LoginCredentials) {
    return await this.authProvider.signIn(user);
  }

  public async logout() {
    await this.authProvider.logout();
  }
}

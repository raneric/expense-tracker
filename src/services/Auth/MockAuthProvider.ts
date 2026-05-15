import type { LoginCredentials } from '../../type/AppType';
import { clearStoredUser } from '../../utils/localStorageUtilities';
import { users } from '../../utils/Const';
import type AuthProvider from './AuthProvider';

export default class MockAuthProvider implements AuthProvider {
  async signIn(credentials: LoginCredentials) {
    console.log(credentials);
    return {
      success: true,
      data: users[0],
    };
  }

  async logout() {
    clearStoredUser();
  }
}

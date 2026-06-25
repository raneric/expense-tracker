import { users } from './MockData';
import type { LoginCredentials } from '../type/AppType';
import { validateCredentials } from '../utils/validationUtilities';
import type AuthProvider from '../services/Auth/AuthProvider';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default class MockAuthProvider implements AuthProvider {
  async signIn(credentials: LoginCredentials) {
    validateCredentials(credentials);
    await delay(1000);
    return users[0];
  }
  async reauthenticate(credentials: LoginCredentials) {
    console.log(credentials);
  }
  async logout() {}
}

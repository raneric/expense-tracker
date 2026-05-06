import type { User } from '../type/AppType';
import { users } from '../utils/Const';

// Fake auth function
export const fakeAuth = async (): Promise<User> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));
  // Return fake user (first user from Const.tsx)
  return users[0];
};

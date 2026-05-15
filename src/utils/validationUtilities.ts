import { AuthError } from '../services/Auth/AuthError';
import type { LoginCredentials, ValidatorConfig } from '../type/AppType';

export function validateInput(value: string, config: ValidatorConfig<string>) {
  const { regex, emptyMessage, invalidMessage, setError, setValid, setData } = config;
  if (value === '') {
    setError(emptyMessage);
    setValid(false);
    return;
  }

  if (!regex.test(value)) {
    setError(invalidMessage);
    setValid(false);
    return;
  }

  setError('');
  setValid(true);
  setData(value);
}
export function removeDuplicateValues<T>(values: T[]): T[] {
  return Array.from(new Set(values));
}

export function isNanOrNegative(value: string): boolean {
  return isNaN(Number(value)) || Number(value) < 0;
}

export function validateCredentials({ email, password }: LoginCredentials): void {
  if (!email) {
    throw new AuthError('Email is required');
  }

  if (!password) {
    throw new AuthError('Password is required');
  }
}

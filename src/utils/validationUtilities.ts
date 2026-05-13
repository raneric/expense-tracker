import type { ValidatorConfig } from '../type/AppType';

export function validateInput(value: string, config: ValidatorConfig) {
  const { regex, emptyMessage, invalidMessage, setError, setValid } = config;
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
}
export function removeDuplicateValues<T>(values: T[]): T[] {
  return Array.from(new Set(values));
}

export function isNanOrNegative(value: string): boolean {
  return isNaN(Number(value)) || Number(value) < 0;
}

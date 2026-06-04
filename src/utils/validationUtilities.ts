import { AuthError } from '../services/Auth/AuthError';
import type { LoginCredentials, ValidatorConfig } from '../type/AppType';

export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

/**
 * Validates a string input against the provided validation rules
 * and updates the associated form state.
 *
 * Validation checks:
 * - Value must not be empty.
 * - Value must match the supplied regular expression.
 *
 * On success, clears any error, marks the input as valid,
 * and stores the validated value.
 *
 * @param value Input value to validate.
 * @param config Validation configuration and state setters.
 */
export function validateInput(value: string, config: ValidatorConfig<string>) {
  const { regex, emptyMessage, invalidMessage, setError, setValid, setData } =
    config;

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

/**
 * Removes duplicate entries from an array while preserving
 * the order of the first occurrence of each value.
 *
 * @param values Array containing potential duplicates.
 * @returns Array containing unique values only.
 */
export function removeDuplicateValues<T>(values: T[]): T[] {
  return Array.from(new Set(values));
}

/**
 * Determines whether a string value is either not a valid
 * number or represents a negative number.
 *
 * Useful for validating numeric form inputs before parsing.
 *
 * @param value String value to validate.
 * @returns True when the value is NaN or negative.
 */
export function isNanOrNegative(value: string): boolean {
  return isNaN(Number(value)) || Number(value) < 0;
}

/**
 * Validates login credentials before attempting authentication.
 *
 * Throws an AuthError when either the email or password
 * is missing.
 *
 * @param credentials User login credentials.
 * @throws AuthError If email or password is not provided.
 */
export function validateCredentials({
  email,
  password,
}: LoginCredentials): void {
  if (!email) {
    throw new AuthError('Email is required');
  }

  if (!password) {
    throw new AuthError('Password is required');
  }
}

/**
 * Formats a Date object into the YYYY-MM-DD format commonly
 * used by HTML date input fields.
 *
 * @param date Date to format.
 * @returns Date string in YYYY-MM-DD format.
 */
export function formatDateForInput(date: Date): string {
  return date.toLocaleDateString('en-CA');
}

/**
 * Checks whether a given date occurs after today.
 *
 * The comparison ignores time values and evaluates dates
 * at day precision only.
 *
 * @param date Date to compare.
 * @returns True if the date is in the future.
 */
export function isFutureDate(date: Date): boolean {
  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const selected = new Date(date);
  selected.setHours(0, 0, 0, 0);

  return selected > today;
}

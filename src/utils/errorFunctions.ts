import { FirebaseError } from 'firebase/app';

export function getErrorMessage(error: unknown): string {
  if (error instanceof Error || error instanceof FirebaseError)
    return error.message;
  if (typeof error === 'string') return error;
  return 'An unexpected error occurred';
}

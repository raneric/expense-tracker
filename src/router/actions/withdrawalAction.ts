import { addDoc, collection } from 'firebase/firestore';
import type { ActionFunctionArgs } from 'react-router-dom';
import { firestoreDb } from '../../config/firebase';
import type { User, Withdrawal } from '../../type/AppType';

function getString(formData: FormData, key: string): string {
  const value = formData.get(key);

  if (typeof value !== 'string' || !value.trim()) {
    throw new Error(`${key} is required`);
  }

  return value.trim();
}

function getNumber(formData: FormData, key: string): number {
  const value = Number(getString(formData, key));

  if (Number.isNaN(value)) {
    throw new Error(`${key} must be a valid number`);
  }

  return value;
}

function getBoolean(formData: FormData, key: string): boolean {
  const value = getString(formData, key);

  return value === 'true' || value === '1';
}

function getDate(formData: FormData, key: string): Date {
  const value = new Date(getString(formData, key));

  if (Number.isNaN(value.getTime())) {
    throw new Error(`${key} must be a valid date`);
  }

  return value;
}

function getStringArray(formData: FormData, key: string): string[] {
  return getString(formData, key)
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function getJson<T>(formData: FormData, key: string): T {
  try {
    return JSON.parse(getString(formData, key));
  } catch {
    throw new Error(`${key} contains invalid JSON`);
  }
}

export function mapFormDataToWithdrawal(formData: FormData): Withdrawal {
  return {
    reasons: getStringArray(formData, 'reasons'),
    date: getDate(formData, 'date'),
    amount: getNumber(formData, 'amount'),
    location: getString(formData, 'location'),
    isForecast: getBoolean(formData, 'isForecast'),
    user: getJson<User>(formData, 'user'),
  };
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const data = mapFormDataToWithdrawal(formData);
  console.log(data);
  const res = await addDoc(collection(firestoreDb, 'withdrawals'), data);
  console.log(res.id);

  return null;
}

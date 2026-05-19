import { addDoc, collection } from 'firebase/firestore';
import type { ActionFunctionArgs } from 'react-router-dom';
import { firestoreDb } from '../../config/firebase';
import type { Withdrawal } from '../../type/AppType';
const mapFormDataToWithdrawal = (formData: FormData): Withdrawal => {
  const withdrawal: Partial<Withdrawal> = {};

  // Loop through all form data entries
  for (const [key, value] of formData.entries()) {
    switch (key) {
      case 'reasons':
        if (typeof value === 'string') {
          withdrawal.reasons = value.split(',').map((r) => r.trim());
        }
        break;

      case 'date':
        if (value instanceof Date) {
          withdrawal.date = value;
        } else if (typeof value === 'string') {
          withdrawal.date = new Date(value);
        }
        break;

      case 'amount':
        if (typeof value === 'number') {
          withdrawal.amount = value;
        } else if (typeof value === 'string') {
          withdrawal.amount = parseFloat(value);
        }
        break;

      case 'location':
        withdrawal.location = value.toString();
        break;

      case 'isForecast':
        if (typeof value === 'boolean') {
          withdrawal.isForecast = value;
        } else if (typeof value === 'string') {
          withdrawal.isForecast = value === 'true' || value === '1';
        }
        break;
      case 'user':
        withdrawal.user = JSON.parse(value.toString());
        break;
      default:
        console.warn(`Unknown form field: ${key}`); //TODO: implement error handling
    }
  }

  // Validate required fields
  if (!withdrawal.reasons) throw new Error('Reasons are required');
  if (!withdrawal.date) throw new Error('Date is required');
  if (withdrawal.amount === undefined) throw new Error('Amount is required');
  if (!withdrawal.location) throw new Error('Location is required');
  if (withdrawal.isForecast === undefined)
    throw new Error('isForecast is required');

  return withdrawal as Withdrawal;
};

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const data = mapFormDataToWithdrawal(formData);
  console.log(data);
  const res = await addDoc(collection(firestoreDb, 'withdrawals'), data);
  console.log(res.id);

  return null;
}

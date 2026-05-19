import { rows } from '../utils/Const';

export async function deleteWithdrawal(id: string) {
  return rows.filter((row) => row.id !== id);
}

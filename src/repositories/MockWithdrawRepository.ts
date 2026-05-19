import type { Withdrawal } from '../type/AppType';
import { rows } from '../utils/Const';
import type BaseRepository from './BaseRepository';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default class MockWithdrawRepository implements BaseRepository<
  Withdrawal,
  string
> {
  async getAll(): Promise<Withdrawal[]> {
    await delay(2000);
    return rows;
  }

  async createOne(data: Withdrawal): Promise<void> {
    console.log(data);
  }
  async getByUnique(unique: string): Promise<Withdrawal> {
    console.log(unique);
    await delay(2000);
    return rows[0];
  }
}

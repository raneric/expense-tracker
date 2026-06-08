import type { QueryConstraint } from 'firebase/firestore';
import type { Withdrawal } from '../../type/AppType';
import type BaseRepository from '../BaseRepository';
import { rows } from '../../test/MockData';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default class MockWithdrawRepository implements BaseRepository<
  Withdrawal,
  string,
  QueryConstraint
> {
  async getAll(constraints?: QueryConstraint[]): Promise<Withdrawal[]> {
    console.log(constraints);
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

  async deleteByUnique(unique: string): Promise<void> {
    console.log(unique);
  }

  async updateOne(data: Withdrawal): Promise<void> {
    console.log(data);
  }
}

import type { Withdrawal } from '../../type/AppType';
import { rows } from '../../utils/Const';
import type DataProvider from './DataProvider';

export default class MockDataProvider implements DataProvider<Withdrawal, string> {
  async getAll() {
    return rows;
  }

  async findOnyById(id: string) {
    const data = rows.find((row) => row.id === id);
    return data;
  }

  async deleteOneById(id: string) {
    console.log(id);
  }
}

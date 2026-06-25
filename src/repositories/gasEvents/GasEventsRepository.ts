import type { QueryConstraint } from 'firebase/firestore';
import { COLLECTIONS } from '../../config/firebase';
import type DataProvider from '../../services/Data/DataProvider';
import FirestoreDataProvider from '../../services/Data/FirestoreDataProvider';
import { type GasEvent } from '../../type/AppType';
import { gasEventsDataMapper } from '../../utils/dataMappers';
import type BaseRepository from '../BaseRepository';

export default class GasEventsRepository
  implements BaseRepository<GasEvent, QueryConstraint>
{
  private readonly dataProvider: DataProvider<GasEvent, QueryConstraint>;

  constructor() {
    this.dataProvider = new FirestoreDataProvider<GasEvent>(
      COLLECTIONS.gasEvents,
      gasEventsDataMapper
    );
  }

  async getAll(constraints?: QueryConstraint[]): Promise<GasEvent[]> {
    return await this.dataProvider.getAll(constraints);
  }

  async createOne(data: GasEvent): Promise<void> {
    await this.dataProvider.createOne(data);
  }

  async getByUnique(unique: string | number): Promise<GasEvent> {
    return await this.dataProvider.getByUnique(unique);
  }

  async deleteByUnique(unique: string | number): Promise<void> {
    await this.dataProvider.deleteByUnique(unique);
  }

  async updateOne(data: GasEvent): Promise<void> {
    const { id: idToUpdate, ...rest } = data;
    await this.dataProvider.updateOne(idToUpdate!, rest);
  }
}

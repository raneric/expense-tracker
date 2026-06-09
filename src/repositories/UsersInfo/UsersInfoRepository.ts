import type BaseRepository from '../BaseRepository';
import { COLLECTIONS } from '../../config/firebase';
import FirestoreDataProvider from '../../services/Data/FirestoreDataProvider';
import type DataProvider from '../../services/Data/DataProvider';
import { userInfoDataMapper } from '../../utils/dataMappers';
import type { UserInfo } from '../../type/AppType';
import type { QueryConstraint } from 'firebase/firestore';

export default class UsersInfoRepository implements BaseRepository<
  UserInfo,
  QueryConstraint
> {
  private readonly dataProvider: DataProvider<UserInfo, QueryConstraint>;

  constructor() {
    this.dataProvider = new FirestoreDataProvider<UserInfo>(
      COLLECTIONS.userInfo,
      userInfoDataMapper
    );
  }

  async getAll(): Promise<UserInfo[]> {
    return await this.dataProvider.getAll();
  }

  async createOne(data: UserInfo): Promise<void> {
    await this.dataProvider.createOne(data);
  }

  async getByUnique(unique: string | number): Promise<UserInfo> {
    return await this.dataProvider.getByUnique(unique);
  }

  async deleteByUnique(unique: string | number): Promise<void> {
    await this.dataProvider.deleteByUnique(unique);
  }

  async updateOne(data: UserInfo): Promise<void> {
    await this.dataProvider.updateOne(data.id, data);
  }
}

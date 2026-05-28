import type BaseRepository from '../BaseRepository';
import { COLLECTIONS } from '../../config/firebase';
import FirestoreDataProvider from '../../services/Data/FirestoreDataProvider';
import type DataProvider from '../../services/Data/DataProvider';
import { userInfoDataMapper } from '../../utils/dataMappers';
import type { UserInfo } from '../../type/AppType';

export default class UsersInfoRepository implements BaseRepository<
  UserInfo,
  string
> {
  private readonly dataProvider: DataProvider<UserInfo, string>;

  constructor() {
    this.dataProvider = new FirestoreDataProvider<UserInfo>(
      COLLECTIONS.userInfo
    );
  }
  async getAll(): Promise<UserInfo[]> {
    return await this.dataProvider.getAll(userInfoDataMapper);
  }
  async createOne(data: UserInfo): Promise<void> {
    console.log(data);
    throw new Error('createOne from UsersInfoRepository not yet implemented');
  }
  async getByUnique(unique: string): Promise<UserInfo> {
    return await this.dataProvider.getByUnique(unique, userInfoDataMapper);
  }
  async deleteByUnique(unique: string): Promise<void> {
    console.log(unique);
    throw new Error(
      'deleteByUnique from UsersInfoRepository not yet implemented'
    );
  }
  async updateOne(data: UserInfo): Promise<void> {
    console.log(data);
    throw new Error('updateOne from UsersInfoRepository not yet implemented');
  }
}

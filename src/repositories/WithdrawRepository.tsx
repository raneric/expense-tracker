import { collection, orderBy } from "firebase/firestore";
import { firestoreDb } from "../config/firebase";
import type DataProvider from "../services/Data/DataProvider";
import FirestoreDataProvider from "../services/Data/FirestoreDataProvider";
import type { Withdrawal } from "../type/AppType";
import type BaseRepository from "./BaseRepository";
import { withdrawalDataMapper } from "../utils/dataMappers";

export default class WithdrawRepository
  implements BaseRepository<Withdrawal, string>
{
  private static readonly docsCollection = "withdrawals";
  private static docsCollectionRef = collection(
    firestoreDb,
    WithdrawRepository.docsCollection
  );
  private readonly dataProvider: DataProvider<Withdrawal, string>;

  constructor() {
    this.dataProvider = new FirestoreDataProvider<Withdrawal, string>(
      WithdrawRepository.docsCollectionRef
    );
  }

  async getAll(): Promise<Withdrawal[]> {
    const queryConstraint = orderBy("date", "desc");
    return await this.dataProvider.getAll(withdrawalDataMapper, [
      queryConstraint,
    ]);
  }
  async createOne(data: Withdrawal): Promise<void> {}
  /* async getByUnique(unique: string): Promise<Withdrawal> {}
  async createOne(data: Withdrawal): Promise<void> {}
  async deleteByUnique(unique: string): Promise<void> {}
  async updateOne(data: Withdrawal): Promise<Withdrawal> {} */
}

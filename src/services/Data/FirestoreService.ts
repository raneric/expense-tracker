import type DataProvider from "./DataProvider";

export default class FirestoreService<T, U> {
  private dataProvider: DataProvider<T, U>;
  constructor(dataProvider: DataProvider<T, U>) {
    this.dataProvider = dataProvider;
  }
}

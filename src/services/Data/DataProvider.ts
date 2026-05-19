import type { DocumentData, QueryConstraint } from 'firebase/firestore';

export default interface DataProvider<T, U> {
  getAll: (
    dataMapper: (data: DocumentData) => T,
    queryConstraints?: QueryConstraint[]
  ) => Promise<T[]>;
  createOne: (data: T) => Promise<void>;
  getByUnique: (unique: U, dataMapper: (data: DocumentData) => T) => Promise<T>;

  /* deleteByUnique: (unique: U) => Promise<void>;
  updateOne: (data: T) => Promise<T>; */
}

import type { QueryConstraint } from 'firebase/firestore';

export default interface BaseRepository<T, U> {
  getAll: (constraints?: QueryConstraint[]) => Promise<T[]>;
  createOne: (data: T) => Promise<void>;
  getByUnique: (unique: U) => Promise<T>;
  deleteByUnique: (unique: U) => Promise<void>;
  updateOne: (data: T) => Promise<void>;
}

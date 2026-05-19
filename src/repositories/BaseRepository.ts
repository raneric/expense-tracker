export default interface BaseRepository<T, U> {
  getAll: () => Promise<T[]>;
  createOne: (data: T) => Promise<void>;
  getByUnique: (unique: U) => Promise<T>;

  /*   deleteByUnique: (unique: U) => Promise<void>;
  updateOne: (data: T) => Promise<T>; */
}

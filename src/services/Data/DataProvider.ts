export default interface DataProvider<T, U> {
  getAll(): Promise<T[]>;
  findOnyById(id: U): Promise<T | undefined>;
  deleteOneById(id: U): Promise<void>;
}

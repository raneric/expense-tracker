import WithdrawRepository from "../../repositories/WithdrawRepository";

export async function withdrawalLoader() {
  const repo = new WithdrawRepository();
  return await repo.getAll();
}

import type { ActionFunctionArgs } from "react-router-dom";
import { deleteWithdrawal } from "../../services/withdrawls";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const id = formData.get("id");
  console.log(`Data ID received in action: ${id}`);
  console.log(`Withdraw amount received in action: ${formData.get("amount")}`);

  await deleteWithdrawal(String(id));
  return null;
}

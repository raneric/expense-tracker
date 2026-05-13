import type { ActionFunctionArgs } from 'react-router-dom';

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const id = formData.get('id');
  console.log(`Data ID received in action: ${id}`);
  console.log(`Start date: ${formData.get('startDate')}`);
  return null;
}

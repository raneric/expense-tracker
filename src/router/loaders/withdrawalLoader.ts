import { collection, getDocs } from "firebase/firestore";
import { firestoreDb } from "../../config/firebase";
import { rows } from "../../utils/Const";

export async function withdrawalLoader() {
  const querySnapshot = await getDocs(collection(firestoreDb, "withdraw"));
  const items = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    date: doc.data().date.toDate(),
    id: doc.id,
  }));
  console.log(items);

  return rows;
}

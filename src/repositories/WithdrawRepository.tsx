import { collection, getDocs } from "firebase/firestore";
import { firestoreDb } from "../config/firebase";

export default class WithdrawRepository {
  async getAll() {
    const querySnapshot = await getDocs(collection(firestoreDb, "withdraw"));
    console.log("from repo");

    console.log(querySnapshot);
  }
}

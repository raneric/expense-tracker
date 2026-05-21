import type { DocumentData } from "firebase/firestore";
import type { Withdrawal } from "../type/AppType";

export const withdrawalDataMapper = (doc: DocumentData) =>
  ({
    ...doc.data(),
    date: doc.data().date.toDate(),
    id: doc.id,
  } as Withdrawal);

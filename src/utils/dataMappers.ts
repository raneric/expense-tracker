import { type User as FirebaseUserData } from 'firebase/auth';
import type { DocumentData } from 'firebase/firestore';
import type {
  DataMapper,
  GasEvent,
  Saving,
  User,
  UserInfo,
  Withdrawal,
} from '../type/AppType';

export const withdrawalDataMapper: DataMapper<DocumentData, Withdrawal> = (
  doc: DocumentData
): Withdrawal => ({
  ...doc.data(),
  date: doc.data().date.toDate(),
  id: doc.id,
});

export const mapFirebaseUser: DataMapper<FirebaseUserData, User> = (
  firebaseUser: FirebaseUserData
): User => ({
  id: firebaseUser.uid,
  email: firebaseUser.email!,
});

export const userInfoDataMapper: DataMapper<DocumentData, UserInfo> = (
  doc: DocumentData
): UserInfo => ({
  id: doc.id,
  firstName: doc.data().first_name,
  lastName: doc.data().last_name,
  pictureUrl: doc.data().picture_url,
  email: doc.data().email,
  salary: doc.data().salary,
});

export const gasEventsDataMapper: DataMapper<DocumentData, GasEvent> = (
  doc: DocumentData
): GasEvent => {
  const startDateAsDayjs = doc.data().startDate.toDate();
  const endDateAsDayjs = doc.data().endDate
    ? doc.data().endDate.toDate()
    : null;

  return {
    id: doc.id,
    startDate: startDateAsDayjs,
    endDate: endDateAsDayjs,
    ownerId: doc.data().ownerId,
    totalDays: doc.data().totalDays,
    type: doc.data().type,
    price: doc.data().price,
  };
};

export const savingDataMapper: DataMapper<DocumentData, Saving> = (
  doc: DocumentData
): Saving => {
  return {
    id: doc.id,
    amount: doc.data().amount,
    month: doc.data().month.toDate(),
    ownerId: doc.data().ownerId,
  };
};

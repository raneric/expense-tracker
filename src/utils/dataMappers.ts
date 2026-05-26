import type { DocumentData } from 'firebase/firestore';
import type { GasEvent, User, UserInfo, Withdrawal } from '../type/AppType';
import { type User as FirebaseUserData } from 'firebase/auth';
import dayjs from 'dayjs';

export const withdrawalDataMapper = (doc: DocumentData): Withdrawal => ({
  ...doc.data(),
  date: doc.data().date.toDate(),
  id: doc.id,
});

export const mapFirebaseUser = (firebaseUser: FirebaseUserData): User => ({
  id: firebaseUser.uid,
  email: firebaseUser.email!,
});

export const userInfoDataMapper = (doc: DocumentData): UserInfo => ({
  id: doc.id,
  firstName: doc.data().first_name,
  lastName: doc.data().last_name,
  pictureUrl: doc.data().picture_url,
  email: doc.data().email,
});

export const gasEventsDataMapper = (doc: DocumentData): GasEvent => {
  const startDateAsDayjs = dayjs(doc.data().startDate.toDate());
  const endDateAsDayjs = doc.data().endDate
    ? dayjs(doc.data().endDate.toDate())
    : null;

  return {
    id: doc.id,
    startDate: startDateAsDayjs,
    endDate: endDateAsDayjs,
    totalDays: doc.data().totalDays,
    type: doc.data().type,
    price: doc.data().price,
  };
};

import type { DocumentData } from 'firebase/firestore';
import type { User, UserInfo, Withdrawal } from '../type/AppType';
import { type User as FirebaseUserData } from 'firebase/auth';

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
  id: doc.data().id,
  firstName: doc.data().first_name,
  lastName: doc.data().last_name,
  pictureUrl: doc.data().picture_url,
  email: doc.data().email,
});

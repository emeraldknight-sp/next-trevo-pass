import { UserCreate, UserRead, UserUpdate } from "@/@types";
import { db } from "@/lib/firebase/firestore";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";

const USERS_COLLECTION = "users";

const usersCollection = () => collection(db, USERS_COLLECTION);

export async function createUserRepository(user: UserCreate) {
  const ref = doc(db, USERS_COLLECTION, user.id);

  await setDoc(ref, user);

  return { ...user };
}

export async function getUsersRepository(): Promise<UserRead[]> {
  const snapshot = await getDocs(usersCollection());

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as UserRead[];
}

export async function getUserByIdRepository(uid: string) {
  const ref = doc(db, USERS_COLLECTION, uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;

  return { id: snap.id, ...snap.data() } as UserRead;
}

export async function updateUserRepository(uid: string, data: UserUpdate) {
  const ref = doc(db, USERS_COLLECTION, uid);

  await updateDoc(ref, { ...data, updatedAt: serverTimestamp() });

  const updatedDoc = await getDoc(ref);

  return { id: updatedDoc.id, ...updatedDoc.data() } as UserRead;
}

export async function deleteUserRepository(uid: string) {
  const ref = doc(db, USERS_COLLECTION, uid);

  await deleteDoc(ref);

  return { id: uid };
}

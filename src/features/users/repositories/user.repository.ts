import { UserCreate, UserRead, UserUpdate } from "@/@types";
import { db } from "@/lib/firebase/firestore";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";

export async function createUserRepository(user: UserCreate) {
  const ref = doc(db, "users", user.id);

  await setDoc(ref, user);

  return { ...user };
}

export async function getUsersRepository(): Promise<UserRead[]> {
  const snapshot = await getDocs(collection(db, "users"));

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as UserRead[];
}

export async function getUserByIdRepository(uid: string) {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;

  return { id: snap.id, ...snap.data() } as UserRead;
}

export async function updateUserRepository(uid: string, data: UserUpdate) {
  const ref = doc(db, "users", uid);

  const snap = await getDoc(ref);

  if (!snap.exists()) {
    throw new Error("Usuario nao encontrado");
  }

  await updateDoc(ref, data);

  const updatedSnap = await getDoc(ref);

  return updatedSnap;
}

export async function deleteUserRepository(uid: string) {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    throw new Error("Usuario nao encontrado");
  }

  await deleteDoc(ref);

  return { id: uid };
}

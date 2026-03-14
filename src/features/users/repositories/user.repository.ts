import { UserFirestore } from "@/@types";
import { db } from "@/lib/firebase/firestore";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const createUserRepository = async (user: UserFirestore) => {
  await setDoc(doc(db, "users", user.uid), user);
};

export const getUserByIdRepository = async (uid: string) => {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);

  return docSnap.exists() ? docSnap.data() : null;
};

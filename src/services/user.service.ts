import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "./firebase/firestore";

export const createUserProfile = async (
  uid: string,
  name: string,
  email: string,
  cpf: string,
  phone: string | null,
) => {
  await setDoc(doc(db, "users", cpf), {
    uid,
    name,
    email,
    cpf,
    phone,
    points: 0,
    totalPointsEarned: 0,
    level: "bronze",
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });
  return;
};

export const getUserProfile = async (uid: string) => {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);

  return docSnap.exists() ? docSnap.data() : null;
};

import { db } from "@/lib/firebase/firestore";
import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";

export const createUserRepository = async (
  uid: string,
  name: string,
  email: string,
  cpf: string,
  phone: string | null,
) => {
  const document = await setDoc(doc(db, "users", uid), {
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
};

export const getUserByIdRepository = async (uid: string) => {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);

  return docSnap.exists() ? docSnap.data() : null;
};

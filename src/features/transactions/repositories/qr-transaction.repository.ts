import {
  TransactionCreate,
  TransactionRead,
  TransactionUpdate,
} from "@/@types";
import { db } from "@/lib/firebase/firestore";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

export async function createQrTransactionRepository(data: TransactionCreate) {
  const transactionRef = await addDoc(collection(db, "qr_transactions"), data);

  return { id: transactionRef.id, transaction: data };
}

export async function getQrTransactionsRepository() {
  const snapshot = await getDocs(collection(db, "qr_transactions"));

  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function getQrTransactionByIdRepository(
  id: string,
): Promise<TransactionRead | null> {
  const ref = doc(db, "qr_transactions", id);
  const snapshot = await getDoc(ref);

  if (!snapshot.exists()) {
    return null;
  }

  const transaction = snapshot.data() as TransactionRead;

  return transaction;
}

export async function updateQrTransactionByIdRepository(
  id: string,
  data: TransactionUpdate,
) {
  const ref = doc(db, "qr_transactions", id);
  await updateDoc(ref, data);
}

export async function deleteQrTransactionRepository(id: string) {
  const ref = doc(db, "qr_transactions", id);
  await deleteDoc(ref);
}

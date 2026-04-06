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
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

const QR_TRANSACTIONS_COLLECTION = "qr_transactions";

const qrTransactionsCollection = () =>
  collection(db, QR_TRANSACTIONS_COLLECTION);

export async function createQrTransactionRepository(data: TransactionCreate) {
  const ref = await addDoc(qrTransactionsCollection(), data);

  return { id: ref.id, ...data };
}

export async function getQrTransactionsRepository() {
  const snapshot = await getDocs(qrTransactionsCollection());

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as TransactionRead[];
}

export async function getQrTransactionByIdRepository(transactionId: string) {
  const ref = doc(db, QR_TRANSACTIONS_COLLECTION, transactionId);
  const snapshot = await getDoc(ref);

  if (!snapshot.exists()) return null;

  return { id: snapshot.id, ...snapshot.data() } as TransactionRead;
}

export async function updateQrTransactionByIdRepository(
  transactionId: string,
  data: TransactionUpdate,
) {
  const ref = doc(db, QR_TRANSACTIONS_COLLECTION, transactionId);
  await updateDoc(ref, { ...data, updatedAt: serverTimestamp() });

  const updatedDoc = await getDoc(ref);

  return {
    id: updatedDoc.id,
    ...updatedDoc.data(),
  } as TransactionRead;
}

export async function deleteQrTransactionRepository(transactionId: string) {
  const ref = doc(db, QR_TRANSACTIONS_COLLECTION, transactionId);

  await deleteDoc(ref);

  return { id: transactionId };
}

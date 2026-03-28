import { TransactionBase } from "@/@types";
import { db } from "@/lib/firebase/firestore";
import { addDoc, collection, runTransaction } from "firebase/firestore";

export async function createTransactionRepository(data: TransactionBase) {
  const transactionRef = await addDoc(collection(db, "transactions"), data);

  await runTransaction(db, async (tx) => {
    const transactionDoc = await tx.get(transactionRef);

    if (transactionDoc.exists()) {
      throw new Error("QR Code ja utilizado");
    }

    tx.set(transactionRef, {
      ...data,
      qrTransactionId: transactionRef.id,
    });
  });

  return { id: transactionRef.id, data };
}

import { collection, doc, runTransaction, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase/firestore";

export async function createTransactionService(data: any) {
  const { transactionId, customerId } = data;

  const transactionResult = await runTransaction(db, async (tx) => {
    const qrRef = doc(db, "qr_transactions", transactionId);
    const qrSnap = await tx.get(qrRef);

    if (!qrSnap.exists()) throw new Error("QR Code nao encontrado");
    const qrTransaction = qrSnap.data();

    const now = Timestamp.now();

    if (qrTransaction.usedAt) throw new Error("Esse QR Code ja foi utilizado");
    if (now.toMillis() > qrTransaction.expiresAt.toMillis())
      throw new Error("Esse QR Code expirou");

    tx.update(qrRef, { usedAt: now });

    const customerTransaction = {
      customerId,
      ...qrTransaction,
      qrTransactionId: qrSnap.id,
      usedAt: now,
      version: 1,
    };

    const transactionRef = doc(collection(db, "transactions"));
    tx.set(transactionRef, customerTransaction);

    return { id: transactionRef.id, data: customerTransaction };
  });

  return transactionResult;
}

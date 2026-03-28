// import { calculatePoints } from "@/utils/points-engine";
import {
  createQrTransactionRepository,
  deleteQrTransactionRepository,
  getQrTransactionByIdRepository,
  getQrTransactionsRepository,
  updateQrTransactionByIdRepository,
} from "../repositories/qr-transaction.repository";
import { defineEvent } from "@/utils/define-event";
import { getUserByIdService } from "@/features/users/services/user.service";
import { serverTimestamp, Timestamp } from "firebase/firestore";
import { User } from "firebase/auth";
import { TransactionCreate, TransactionRead } from "@/@types";

export async function createQrTransactionService(data: {
  user: User;
  event: "purchase" | "reward" | "campaign";
  referenceId: string;
  amount: number;
}) {
  const { user, event, referenceId, amount } = data;
  const generatorUser = await getUserByIdService(user.uid);

  if (!generatorUser) throw new Error("Falha ao gerar com permissao");

  if (generatorUser.role !== "employee" && generatorUser.role !== "manager") {
    throw new Error("Sem permissao para gerar QR Code");
  }

  const { source, type } = defineEvent(event);
  const expiresAt = new Date(Date.now() + 60 * 1000);
  // const points = calculatePoints(amount, generatorUser!.level);

  const qrTransaction: TransactionCreate = {
    referenceId,
    establismentId: generatorUser.establishmentId,
    createdBy: generatorUser.uid,
    createdByType: generatorUser.role,
    amount,
    source,
    type,
    createdAt: serverTimestamp(),
    expiresAt: Timestamp.fromDate(expiresAt),
    usedAt: null,
    version: 1,
  };

  const { id, transaction } =
    await createQrTransactionRepository(qrTransaction);

  return { id, expiresAt, version: transaction.version };
}

export async function getQrTransactionsService() {
  const qrTransactions = await getQrTransactionsRepository();

  return qrTransactions;
}

export async function getQrTransactionByIdService(qrTransactionId: string) {
  const qrTransaction = await getQrTransactionByIdRepository(qrTransactionId);

  if (!qrTransaction) {
    throw new Error("Transacao nao existe");
  }

  return qrTransaction;
}

export async function updateQrTransactionService(
  id: string,
  data: Partial<TransactionRead>,
) {
  const qrTransaction = await getQrTransactionByIdService(id);

  await updateQrTransactionByIdRepository(id, data);

  return { ...qrTransaction, ...data };
}

export async function deleteQrTransactionService(id: string) {
  await getQrTransactionByIdRepository(id);

  await deleteQrTransactionRepository(id);

  return {
    message: "Transacao deletada com sucesso",
  };
}

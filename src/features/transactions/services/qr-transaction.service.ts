// import { calculatePoints } from "@/utils/points-engine";
import {
  createQrTransactionRepository,
  deleteQrTransactionRepository,
  getQrTransactionByIdRepository,
  getQrTransactionsRepository,
  updateQrTransactionByIdRepository,
} from "../repositories/qr-transaction.repository";
import { AppError } from "@/utils/app-error";
import { TransactionCreate, TransactionUpdate } from "@/@types";
import { User } from "firebase/auth";
import { checkUserPermission } from "@/utils/permissions";
import { defineEvent } from "@/utils/define-event";
import { generateQrTimestamps } from "@/utils/timestamps";
import { getUserByIdService } from "@/features/users/services/user.service";

export async function createQrTransactionService(data: {
  user: User;
  event: "purchase" | "reward" | "campaign";
  referenceId: string;
  amount: number;
}) {
  const { user, event, referenceId, amount } = data;
  const { establishmentId, role } = await getUserByIdService(user.uid);

  checkUserPermission(role, ["employee", "manager", "admin"]);

  const { source, type } = defineEvent(event);
  const { createdAt, updatedAt, expiresAt } = generateQrTimestamps(60);
  // const points = calculatePoints(amount, generatorUser!.level);

  const qrTransaction: TransactionCreate = {
    referenceId,
    establismentId: establishmentId,
    createdBy: user.uid,
    createdByType: role,
    amount,
    source,
    type,
    createdAt,
    updatedAt,
    expiresAt,
    usedAt: null,
    version: 1,
  };

  const transaction = await createQrTransactionRepository(qrTransaction);

  return transaction;
}

export async function getQrTransactionsService() {
  const qrTransactions = await getQrTransactionsRepository();

  return qrTransactions;
}

export async function getQrTransactionByIdService(qrTransactionId: string) {
  if (!qrTransactionId) {
    throw new AppError(
      "TRANSACTION_ID_REQUIRED",
      "ID da transação é obrigatório",
      400,
    );
  }

  const qrTransaction = await getQrTransactionByIdRepository(qrTransactionId);

  if (!qrTransaction) {
    throw new AppError(
      "TRANSACTION_NOT_FOUND",
      "Transação não encontrada",
      404,
    );
  }

  return qrTransaction;
}

export async function updateQrTransactionService(
  qrTransactionId: string,
  data: TransactionUpdate,
) {
  if (!qrTransactionId) {
    throw new AppError(
      "TRANSACTION_ID_REQUIRED",
      "ID da transação é obrigatório",
      400,
    );
  }

  const qrTransaction = await getQrTransactionByIdService(qrTransactionId);

  if (qrTransaction!.usedAt && data.usedAt) {
    throw new AppError(
      "TRANSACTION_ALREADY_USED",
      "Transação já utilizada",
      400,
    );
  }

  const forbiddenFields = ["createdBy", "establishmentId"];
  for (const field of forbiddenFields) {
    if (field in data) {
      throw new AppError(
        "FORBIDDEN_FIELD_UPDATE",
        `Não é permitido atualizar o campo ${field}`,
        403,
      );
    }
  }

  const updatedQrTransaction = await updateQrTransactionByIdRepository(
    qrTransactionId,
    data,
  );

  return updatedQrTransaction;
}

export async function deleteQrTransactionService(qrTransactionId: string) {
  const qrTransaction = await getQrTransactionByIdService(qrTransactionId);

  if (qrTransaction!.usedAt) {
    throw new AppError(
      "CANNOT_DELETE_USED_TRANSACTION",
      "Não é permitido deletar transações já utilizadas",
      403,
    );
  }

  await deleteQrTransactionRepository(qrTransactionId);

  return {
    message: "Transação deletada com sucesso",
  };
}

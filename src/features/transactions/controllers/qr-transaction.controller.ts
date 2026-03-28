import { createQrTransactionService, updateQrTransactionService } from "../services/qr-transaction.service";

export async function createQrTransactionController(data: any) {
  try {
    const qrTransaction = await createQrTransactionService(data);

    return qrTransaction;
  } catch (error: any) {
    throw error;
  }
}

export async function updateQrTransactionController(transactionId: string, data: any) {
  try {
    const qrTransaction = await updateQrTransactionService(transactionId, data)

    return qrTransaction;
  } catch (error: any) {
    throw error;
  }
}
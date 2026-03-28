import { createTransactionService } from "../services/transaction.service";

export async function createTransactionController(data: any) {
  try {
    const transaction = await createTransactionService(data);

    return transaction;
  } catch (error) {
    throw error;
  }
}

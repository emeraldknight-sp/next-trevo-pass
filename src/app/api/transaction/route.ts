import { createTransactionService } from "@/features/transactions/services/transaction.service";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const result = await createTransactionService(body);

    return NextResponse.json(result)
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message},
      { status: 400 }
    )
  }
}
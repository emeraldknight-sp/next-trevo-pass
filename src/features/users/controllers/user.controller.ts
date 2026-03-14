import { UserFirestore } from "@/@types";
import {
  createUserService,
  getUserByIdService,
} from "../services/user.service";

export async function createUserController(data: UserFirestore) {
  try {
    const user = await createUserService(data);
    return user;
  } catch (error: any) {
    throw error;
  }
}

export async function getUserByIdController(userId: string) {
  try {
    const user = await getUserByIdService(userId);
    return user;
  } catch (error: any) {
    throw error;
  }
}

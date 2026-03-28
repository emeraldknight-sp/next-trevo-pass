import { UserBase, UserUpdate } from "@/@types";
import {
  createUserService,
  deleteUserService,
  getUserByIdService,
  getUsersService,
  updateUserService,
} from "../services/user.service";
import { handlerError } from "@/utils/handler-error";

export async function createUserController(data: UserBase) {
  try {
    const user = await createUserService(data);
    return user;
  } catch (error: unknown) {
    handlerError(error);
  }
}

export async function getUsersController() {
  try {
    const users = await getUsersService();
    return users;
  } catch (error: unknown) {
    handlerError(error);
  }
}

export async function getUserByIdController(userId: string) {
  try {
    const user = await getUserByIdService(userId);
    return user;
  } catch (error: unknown) {
    handlerError(error);
  }
}

export async function updateUserController(userId: string, data: UserUpdate) {
  try {
    const updatedUser = await updateUserService(userId, data);
    return updatedUser;
  } catch (error: unknown) {
    handlerError(error);
  }
}

export async function deleteUserController(userId: string) {
  try {
    const deletedUser = await deleteUserService(userId);
    return deletedUser;
  } catch (error: unknown) {
    handlerError(error);
  }
}

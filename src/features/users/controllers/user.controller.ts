import { createUserService } from "../services/user.service";

export async function createUserController(data: any) {
  try {
    const user = await createUserService(data);
    return user;
  } catch (error: any) {
    throw error;
  }
}

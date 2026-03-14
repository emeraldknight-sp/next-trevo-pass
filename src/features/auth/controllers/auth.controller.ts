import { UserForm } from "@/@types";
import { createAuthService } from "../services/auth.service";

export async function createAuthController(data: UserForm) {
  try {
    const user = await createAuthService(data);
    return user;
  } catch (error: any) {
    throw error;
  }
}

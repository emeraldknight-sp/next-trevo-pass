import { createAuthService } from "../services/auth.service";

export async function createAuthController(email: string, password: string) {
  try {
    const { uid } = await createAuthService(email, password);
    return { uid };
  } catch (error: unknown) {
    throw error;
  }
}

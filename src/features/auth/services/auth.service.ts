import { registerUser } from "../repositories/auth.repository";

export async function createAuthService(email: string, password: string) {
  const userCredential = await registerUser(email, password);

  return { uid: userCredential.user.uid };
}

import { checkDuplicate } from "@/utils/check-duplicate";
import { registerUser } from "../repositories/auth.repository";
import { normalizedCpf } from "@/utils/normalize-cpf";
import { normalizePhone } from "@/utils/normalize-phone";
import { createUserController } from "@/features/users/controllers/user.controller";

export async function createAuthService(data: {
  name: string;
  email: string;
  password: string;
  cpf: string;
  phone: string | null;
}) {
  const phone = normalizePhone(data.phone);
  const cpf = normalizedCpf(data.cpf);
  await checkDuplicate({ phone, cpf });
  
  const userCredential = await registerUser(data.email, data.password);
  const uid = userCredential.user.uid;

  const user = await createUserController({
    uid,
    name: data.name,
    email: data.email,
    cpf,
    phone
  });

  return user;
}

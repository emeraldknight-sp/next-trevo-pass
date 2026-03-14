import { UserForm } from "@/@types";
import { checkDuplicate } from "@/utils/check-duplicate";
import { createUserService } from "@/features/users/services/user.service";
import { normalizeCpf } from "@/utils/normalize-cpf";
import { normalizePhone } from "@/utils/normalize-phone";
import { registerUser } from "../repositories/auth.repository";

export async function createAuthService(data: UserForm) {
  const { phone, cpf, email, password } = data;

  const normalizedPhone = normalizePhone(phone);
  const normalizedCpf = normalizeCpf(cpf);
  await checkDuplicate({ phone, cpf });

  const userCredential = await registerUser(email, password);
  const uid = userCredential.user.uid;

  const user = await createUserService({
    ...data,
    uid,
    cpf: normalizedCpf,
    phone: normalizedPhone,
  });

  return user;
}

import { createUserRepository } from "../repositories/user.repository";
import { normalizedCpf } from "@/utils/normalize-cpf";
import { normalizePhone } from "@/utils/normalize-phone";

export async function createUserService(data: any) {
  const { uid, name, email, cpf, phone } = data;

  const user = await createUserRepository(
    uid,
    name,
    email,
    normalizedCpf(cpf),
    normalizePhone(phone),
  );

  return user;
}

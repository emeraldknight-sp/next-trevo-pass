import { UserFirestore, UserIdentity } from "@/@types";
import {
  createUserRepository,
  getUserByIdRepository,
} from "../repositories/user.repository";
import { normalizeCpf } from "@/utils/normalize-cpf";
import { normalizePhone } from "@/utils/normalize-phone";
import { serverTimestamp } from "firebase/firestore";

export async function createUserService(data: UserIdentity) {
  const { cpf, phone, ...rest } = data;

  const user: UserFirestore = {
    ...rest,
    cpf: normalizeCpf(cpf),
    phone: normalizePhone(phone),
    points: 0,
    totalPointsEarned: 0,
    level: "bronze",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  await createUserRepository(user);

  return user;
}

export async function getUserByIdService(userId: string) {
  const user = await getUserByIdRepository(userId);

  return user;
}

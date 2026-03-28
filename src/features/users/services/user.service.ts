import { UserBase, UserCreate, UserUpdate } from "@/@types";
import {
  createUserRepository,
  deleteUserRepository,
  getUserByIdRepository,
  getUsersRepository,
  updateUserRepository,
} from "../repositories/user.repository";
import { normalizeCpf } from "@/utils/normalize-cpf";
import { normalizePhone } from "@/utils/normalize-phone";
import { serverTimestamp } from "firebase/firestore";
import { checkDuplicate } from "@/utils/check-duplicate";

export async function createUserService(data: UserBase) {
  const { cpf, phone, role, id, ...rest } = data;

  const normalizedPhone = normalizePhone(phone)
  const normalizedCpf = normalizeCpf(cpf)

  await checkDuplicate(normalizedPhone, normalizedCpf)

  const user: UserCreate = {
    ...rest,
    id: id!,
    cpf: normalizedCpf,
    phone: normalizedPhone,
    points: 0,
    totalPointsEarned: 0,
    role: role ?? "customer",
    level: "bronze",
    status: "active",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  await createUserRepository(user);

  return user;
}

export async function getUsersService() {
  const users = await getUsersRepository();

  if (!users || users.length === 0) {
    return [];
  }

  const safeUsers = users.map(({ cpf, email, phone, ...user }) => user);

  return safeUsers;
}

export async function getUserByIdService(userId: string) {
  if (!userId) {
    throw new Error("ID do usuario eh obrigatorio");
  }

  const user = await getUserByIdRepository(userId);

  if (!user) {
    throw new Error("Usuario nao encontrado");
  }

  const { cpf, email, phone, ...safeUser } = user;

  return safeUser;
}

export async function updateUserService(userId: string, data: UserUpdate) {
  if (!userId) {
    throw new Error("ID do usuario eh obrigatorio");
  }

  const user = await getUserByIdService(userId);

  if (!user) throw new Error("Usuario nao encontrado");

  if (data.role && data.role !== user.role) {
    throw new Error("Nao eh permitido alterar o role de usuario");
  }

  if (!data || Object.keys(data).length === 0) {
    throw new Error("Nenhum dado para atualizar");
  }

  const updatedUser = await updateUserRepository(userId, data);

  return updatedUser;
}

export async function deleteUserService(userId: string) {
  if (!userId) {
    throw new Error("ID do usuario eh obrigatorio");
  }

  const user = await getUserByIdService(userId);

  if (!user) {
    throw new Error("Usuario nao encontrado");
  }

  if (user.role === "admin") {
    throw new Error("Nao eh permitido deletar um administrador");
  }

  await deleteUserRepository(userId);

  return { message: "Usuario deletado com sucesso" };
}

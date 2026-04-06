import {
  createUserRepository,
  deleteUserRepository,
  getUserByIdRepository,
  getUsersRepository,
  updateUserRepository,
} from "../repositories/user.repository";
import { AppError } from "@/utils/app-error";
import { UserBase, UserCreate, UserRead, UserUpdate } from "@/@types";
import { checkDuplicate } from "@/utils/check-duplicate";
import { normalizeCpf } from "@/utils/normalize-cpf";
import { normalizePhone } from "@/utils/normalize-phone";
import { sanitizeUser, sanitizeUsers } from "../../../utils/sanitize-user";
import { serverTimestamp } from "firebase/firestore";

export async function createUserService(data: UserBase) {
  const { cpf, phone, role, id, ...rest } = data;

  const normalizedPhone = normalizePhone(phone);
  const normalizedCpf = normalizeCpf(cpf);

  await checkDuplicate(normalizedPhone, normalizedCpf);

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

  return {
    ...sanitizeUser(user as UserRead),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

export async function getUsersService() {
  const users = await getUsersRepository();

  return sanitizeUsers(users);
}

export async function getUserByIdService(userId: string) {
  if (!userId) {
    throw new AppError("USER_ID_REQUIRED", "ID do usuário é obrigatório", 400);
  }

  const user = await getUserByIdRepository(userId);

  if (!user) {
    throw new AppError("USER_NOT_FOUND", "Usuário não encontrado", 404);
  }

  return sanitizeUser(user);
}

export async function updateUserService(userId: string, data: UserUpdate) {
  if (!userId) {
    throw new AppError("USER_ID_REQUIRED", "ID do usuário é obrigatório", 400);
  }

  if (!data || Object.keys(data).length === 0) {
    throw new AppError("NO_UPDATE_DATA", "Nenhum dado para atualizar", 400);
  }

  const existingUser = await getUserByIdService(userId);
  if (!existingUser)
    throw new AppError("NOT_FOUND", "Usuário não encontrado", 404);

  if (data.role && data.role !== existingUser.role)
    throw new AppError(
      "CANNOT_CHANGE_ROLE",
      "Não é permitido alterar o role de usuário",
      403,
    );

  const updatedUser = await updateUserRepository(userId, data);

  return sanitizeUser(updatedUser);
}

export async function deleteUserService(userId: string) {
  if (!userId) {
    throw new AppError("USER_ID_REQUIRED", "ID do usuário é obrigatório", 400);
  }

  const user = await getUserByIdService(userId);

  if (!user) {
    throw new AppError("USER_NOT_FOUND", "Usuário não encontrado", 404);
  }

  if (user.role === "admin") {
    throw new AppError(
      "CANNOT_DELETE_ADMIN",
      "Não é permitido deletar um administrador",
      403,
    );
  }

  await deleteUserRepository(userId);

  return { message: "Usuário deletado com sucesso" };
}

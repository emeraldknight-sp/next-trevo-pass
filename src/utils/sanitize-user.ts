import { UserRead } from "@/@types";

export function sanitizeUser(user: UserRead) {
  const { cpf, email, phone, ...safeUser } = user;
  return safeUser;
}

export function sanitizeUsers(users: UserRead[]) {
  return users.map(sanitizeUser);
}

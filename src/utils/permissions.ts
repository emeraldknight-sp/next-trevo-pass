import { AppError } from "./app-error";

export function checkUserPermission(role: string, allowedRoles: string[]) {
  if (!allowedRoles.includes(role))
    throw new AppError(
      "UNAUTHORIZED",
      "Não é permitido alterar o role de usuário",
      403,
    );
}
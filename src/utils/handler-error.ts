import { FirebaseError } from "firebase/app";
import { toast } from "sonner";
import { AppError } from "./app-error";

export const handlerError = (error: unknown) => {
  console.error(error);

  if (error instanceof FirebaseError) {
    const firebaseMessages: Record<string, string> = {
      "auth/email-already-in-use": "Este e-mail já está em uso.",
      "auth/invalid-email": "E-mail inválido.",
      "auth/weak-password": "Senha muito fraca.",
    };

    const message =
      firebaseMessages[error.code] ?? "Erro ao autenticar usuário.";

    toast.error(message, { id: error.code });

    return;
  }

  if (error instanceof AppError) {
    toast.error(error.message, { id: error.code });
    return;
  }

  const message = error instanceof Error ? error.message : "Erro desconhecido";

  toast.error(message, { id: "unknown-error" });
};

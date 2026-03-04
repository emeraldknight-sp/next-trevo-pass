import { AppError } from "./app-error";
import { FirebaseError } from "firebase/app";
import { toast } from "sonner";

export const handlerError = (error: unknown) => {
  if (error instanceof FirebaseError) {
    switch (error.code) {
      case "auth/email-already-in-use":
        toast.error("Este e-mail já está em uso.", {
          id: "email-already-in-use",
        });
        break;

      case "auth/invalid-email":
        toast.error("E-mail inválido.", { id: "invalid-email" });
        break;

      case "auth/weak-password":
        toast.error("Senha muito fraca.", { id: "weak-password" });
        break;

      default:
        toast.error("Erro ao criar conta.", { id: "register-error" });
        console.error(error.code, error.message);
    }

    console.error(error);
    throw error;
  } else if (error instanceof AppError) {
    toast.error(error.message, { id: error.code });

    console.error(error);
    return error;
  } else {
    const message =
      error instanceof Error ? error.message : "Erro desconhecido";
    toast.error(message, { id: "unknown-error" });

    console.error(error);
    throw error;
  }
};

import { db } from "@/services/firebase/firestore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { AppError } from "./app-error";

export const checkDuplicate = async ({
  cpf,
  phone,
}: {
  cpf: string;
  phone: string;
}) => {
  const usersRef = collection(db, "users");

  const [cpfSnapshot, phoneSnapshot] = await Promise.all([
    getDocs(query(usersRef, where("cpf", "==", cpf))),
    getDocs(query(usersRef, where("phone", "==", phone))),
  ]);

  const duplicateCpf = !cpfSnapshot.empty;
  const duplicatePhone = !phoneSnapshot.empty;

  if (duplicateCpf)
    throw new AppError(
      "auth/cpf-already-in-use",
      "Este documento já está em uso.",
    );

  if (duplicatePhone)
    throw new AppError(
      "auth/phone-already-in-use",
      "Este telefone já está em uso.",
    );
};

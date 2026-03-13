import { db } from "@/lib/firebase/firestore";
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

  const [phoneSnapshot, cpfSnapshot] = await Promise.all([
    getDocs(query(usersRef, where("phone", "==", phone))),
    getDocs(query(usersRef, where("cpf", "==", cpf))),
  ]);

  const duplicatePhone = !phoneSnapshot.empty;
  const duplicateCpf = !cpfSnapshot.empty;

  if (duplicatePhone) 
    throw new AppError(
      "auth/phone-already-in-use",
      "Este telefone já está em uso.",
    );

  if (duplicateCpf)
    throw new AppError(
      "auth/cpf-already-in-use",
      "Este CPF já está em uso.",
    );

};

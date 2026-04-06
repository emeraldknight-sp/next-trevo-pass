import { db } from "@/lib/firebase/firestore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { AppError } from "./app-error";

export const checkDuplicate = async (phone: string, cpf: string) => {
  const usersRef = collection(db, "users");

  const [phoneSnapshot, cpfSnapshot] = await Promise.all([
    getDocs(query(usersRef, where("phone", "==", phone))),
    getDocs(query(usersRef, where("cpf", "==", cpf))),
  ]);

  if (!phoneSnapshot.empty || !cpfSnapshot.empty) {
    throw new AppError("USER_DUPLICATE", "CPF ou telefone já cadastrado", 409);
  }
};

import { registerUser } from "@/services/auth.service";
import { createUserProfile } from "@/services/user.service";
import { checkDuplicate } from "@/utils/check-duplicate";

export async function registerUserFeature(data: {
  name: string;
  email: string;
  password: string;
  cpf: string;
  phone: string | null;
}) {
  const normalizedCpf = data.cpf.replace(/\D/g, "");
  const normalizedPhone = data.phone
    ? data.phone.replace(/\D/g, "").slice(-11)
    : "";

  await checkDuplicate({ cpf: normalizedCpf, phone: normalizedPhone });

  const userCredential = await registerUser(data.email, data.password);

  await createUserProfile(
    userCredential.user.uid,
    data.name,
    data.email,
    normalizedCpf,
    normalizedPhone,
  );

  return userCredential.user;
}

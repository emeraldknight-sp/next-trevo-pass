import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(1, "Por favor, informe seu nome."),
  email: z
    .string()
    .min(1, "Por favor, informe seu e-mail.")
    .email("Digite um e-mail válido para continuar."),
  password: z.string().min(8, "Sua senha precisa ter pelo menos 8 caracteres."),
  confirmPassword: z.string().min(8, "Sua senha precisa ter pelo menos 8 caracteres."),
}).superRefine(({ confirmPassword, password }, ctx) => {
  if (confirmPassword !== password) {
    ctx.addIssue({
      code: "custom",
      message: "As senhas não são iguais. Verifique e tente novamente.",
      path: ['confirmPassword']
    });
  }
});;

export type RegisterSchema = z.infer<typeof registerSchema>;

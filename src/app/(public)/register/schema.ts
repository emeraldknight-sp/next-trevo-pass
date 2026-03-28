import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(1, "Por favor, informe seu nome."),
    email: z
      .string()
      .min(1, "Por favor, informe seu e-mail.")
      .email("Digite um e-mail válido para continuar."),
    phone: z
      .string()
      .min(1, "Por favor, informe seu telefone.")
      .max(11, "Numero de telefone inválido")
      .regex(/^\(?\d{2}\)?\s?9\d{4}-?\d{4}$/, "Telefone inválido"),
    cpf: z
      .string()
      .min(11, "CPF incompleto")
      .max(14, "CPF inválido")
      .regex(/^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/, "CPF inválido"),
    password: z
      .string()
      .min(8, "Sua senha precisa ter pelo menos 8 caracteres."),
    confirmPassword: z
      .string()
      .min(8, "Sua senha precisa ter pelo menos 8 caracteres."),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "As senhas não são iguais. Verifique e tente novamente.",
        path: ["confirmPassword"],
      });
    }
  });

export type RegisterSchema = z.infer<typeof registerSchema>;

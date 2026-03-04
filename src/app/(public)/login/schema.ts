import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Por favor, informe seu e-mail.")
    .email("Digite um e-mail válido para continuar."),
  password: z.string().min(8, "Sua senha precisa ter pelo menos 8 caracteres."),
});

export type LoginSchema = z.infer<typeof loginSchema>;

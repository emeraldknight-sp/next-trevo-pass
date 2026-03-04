"use client";

import { Eye, EyeClosed, Lock, Mail, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { registerSchema, RegisterSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { LaminatedButton } from "@/components/ui/laminated";
import Link from "next/link";

export const RegisterForm = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handlePasswordVisible = () => {
    setIsVisible(!isVisible);
  };

  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchema>({ resolver: zodResolver(registerSchema) });

  const onSubmit = async (data: RegisterSchema) => {
    setError(null);

    console.log("REGISTER - DATA:", data);

    // const res = await fetch("/api/auth/register", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(data)
    // });

    // if (!res.ok) {
    //   setError("Falha ao criar conta");
    //   return;
    // }

    // router.push("/");
  };

  return (
    <>
      <form className="flex flex-col gap-2 w-full max-w-75">
        <div>
          <div className="flex flex-row items-center gap-1 px-2 py-1 border border-slate-200 rounded-md focus-within:ring-2 focus-within:ring-violet-900">
            <label htmlFor="name" className="sr-only">
              Seu nome
            </label>
            <User size={20} className="text-slate-500" aria-hidden="true" />
            <input
              type="name"
              placeholder="Seu nome e sobrenome"
              className="w-full text-slate-700 placeholder:text-slate-500 outline-none focus:outline-none focus-visible:ring-0 px-2 py-1"
              autoComplete="name"
              required
              {...register("name")}
            />
          </div>
          {errors.name && (
            <span className="text-red-500 text-xs font-ubuntu">
              {errors.name.message}
            </span>
          )}
        </div>
        <div>
          <div className="flex flex-row items-center gap-1 px-2 py-1 border border-slate-200 rounded-md focus-within:ring-2 focus-within:ring-violet-900">
            <label htmlFor="email" className="sr-only">
              E-mail
            </label>
            <Mail size={20} className="text-slate-500" aria-hidden="true" />
            <input
              type="email"
              placeholder="Seu e-mail"
              className="w-full text-slate-700 placeholder:text-slate-500 outline-none focus:outline-none focus-visible:ring-0 px-2 py-1"
              autoComplete="email"
              required
              {...register("email")}
            />
          </div>
          {errors.email && (
            <span className="text-red-500 text-xs font-ubuntu">
              {errors.email.message}
            </span>
          )}
        </div>
        <div>
          <div className="flex flex-row items-center gap-1 px-2 py-1 border border-slate-200 rounded-md focus-within:ring-2 focus-within:ring-violet-900">
            <label htmlFor="password" className="sr-only">
              Senha
            </label>
            <Lock size={20} className="text-slate-500" />
            <input
              type={isVisible ? "text" : "password"}
              placeholder="Sua senha"
              className="w-full text-slate-700 placeholder:text-slate-500 outline-none focus:outline-none focus-visible:ring-0 px-2 py-1"
              autoComplete="new-password"
              required
              {...register("password")}
            />
            <button
              type="button"
              className="hover:cursor-pointer outline-none focus-within:outline-none focus-within:ring-0"
              onClick={handlePasswordVisible}
            >
              {isVisible ? (
                <Eye size={20} className="text-slate-500" />
              ) : (
                <EyeClosed size={20} className="text-slate-500" />
              )}
            </button>
          </div>
          {errors.password && (
            <span className="text-red-500 text-xs font-ubuntu">
              {errors.password.message}
            </span>
          )}
        </div>
        <div>
          <div className="flex flex-row items-center gap-1 px-2 py-1 border border-slate-200 rounded-md focus-within:ring-2 focus-within:ring-violet-900">
            <label htmlFor="confirm-password" className="sr-only">
              Confirme sua senha
            </label>
            <Lock size={20} className="text-slate-500" />
            <input
              type={isVisible ? "text" : "password"}
              placeholder="Confirme sua senha"
              className="w-full text-slate-700 placeholder:text-slate-500 outline-none focus:outline-none focus-visible:ring-0 px-2 py-1"
              autoComplete="new-password"
              required
              {...register("confirmPassword")}
            />
            <button
              type="button"
              className="hover:cursor-pointer outline-none focus-within:outline-none focus-within:ring-0"
              onClick={handlePasswordVisible}
            >
              {isVisible ? (
                <Eye size={20} className="text-slate-500" />
              ) : (
                <EyeClosed size={20} className="text-slate-500" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <span className="text-red-500 text-xs font-ubuntu">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>
        <Link
          href="/"
          className="text-violet-900 text-right text-xs font-normal font-ubuntu"
        >
          Esqueceu sua senha?
        </Link>
        <LaminatedButton
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Processando" : "Criar conta"}
        </LaminatedButton>
      </form>
    </>
  );
};

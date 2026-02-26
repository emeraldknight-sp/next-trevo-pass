"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { LaminatedButton } from "@/components/ui/laminated";
import { Eye, EyeClosed, Mail, Lock, User } from "lucide-react";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    console.log(form);
  };

  const [isVisible, setIsVisible] = useState(false);

  const handlePasswordVisible = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <div className="flex flex-col justify-center gap-4 h-screen p-4 md:px-8">
        <div className="flex flex-row justify-center items-center gap-2">
          <Image
            src="/images/logo.png"
            className="rounded-full"
            width="36"
            height="36"
            alt="trevo pass logo"
            priority
          />
          <p className="inline-flex gap-1 text-xl font-bold font-ubuntu">
            <span className="text-violet-900">Trevo</span>
            <span className="text-yellow-500">Pass</span>
          </p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-slate-900 text-lg font-medium font-ubuntu">
            Crie a sua conta
          </h2>
          <p className="text-slate-500 text-sm text-center font-normal font-ubuntu">
            Comece a ganhar pontos e resgatar recompensas
          </p>
        </div>
        <form className="flex flex-col gap-2">
          <div className="flex flex-row items-center gap-1 px-2 py-1 border border-slate-200 rounded-md focus-within:ring-2 focus-within:ring-violet-900">
            <label htmlFor="name" className="sr-only">
              Seu nome
            </label>
            <User size={20} className="text-slate-500" aria-hidden="true" />
            <input
              id="name"
              name="name"
              type="name"
              placeholder="Seu nome e sobrenome"
              className="w-full text-slate-700 placeholder:text-slate-500 outline-none focus:outline-none focus-visible:ring-0 px-2 py-1"
              onChange={handleChange}
              value={form.name}
              autoComplete="name"
              required
            />
          </div>
          <div className="flex flex-row items-center gap-1 px-2 py-1 border border-slate-200 rounded-md focus-within:ring-2 focus-within:ring-violet-900">
            <label htmlFor="email" className="sr-only">
              E-mail
            </label>
            <Mail size={20} className="text-slate-500" aria-hidden="true" />
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Seu e-mail"
              className="w-full text-slate-700 placeholder:text-slate-500 outline-none focus:outline-none focus-visible:ring-0 px-2 py-1"
              onChange={handleChange}
              value={form.email}
              autoComplete="email"
              required
            />
          </div>
          <div className="flex flex-row items-center gap-1 px-2 py-1 border border-slate-200 rounded-md focus-within:ring-2 focus-within:ring-violet-900">
            <label htmlFor="password" className="sr-only">
              Senha
            </label>
            <Lock size={20} className="text-slate-500" />
            <input
              id="password"
              name="password"
              type={isVisible ? "text" : "password"}
              placeholder="Sua senha"
              className="w-full text-slate-700 placeholder:text-slate-500 outline-none focus:outline-none focus-visible:ring-0 px-2 py-1"
              onChange={handleChange}
              value={form.password}
              autoComplete="new-password"
              required
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
          <div className="flex flex-row items-center gap-1 px-2 py-1 border border-slate-200 rounded-md focus-within:ring-2 focus-within:ring-violet-900">
            <label htmlFor="confirm-password" className="sr-only">
              Confirme sua senha
            </label>
            <Lock size={20} className="text-slate-500" />
            <input
              id="confirm-password"
              name="confirmPassword"
              type={isVisible ? "text" : "password"}
              placeholder="Confirme sua senha"
              className="w-full text-slate-700 placeholder:text-slate-500 outline-none focus:outline-none focus-visible:ring-0 px-2 py-1"
              onChange={handleChange}
              value={form.confirmPassword}
              autoComplete="new-password"
              required
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
          <Link
            href="/"
            className="text-violet-900 text-right text-xs font-normal font-ubuntu"
          >
            Esqueceu sua senha?
          </Link>
        </form>
        <div className="flex flex-col gap-3">
          <LaminatedButton onClick={handleSubmit}>Criar conta</LaminatedButton>
          <div className="flex flex-row items-center gap-2">
            <span className="border-t border-slate-300 flex-1"></span>
            <span className="text-slate-500 text-sm font-normal font-ubuntu">
              Ja possui uma conta?
            </span>
            <span className="border-b border-slate-300 flex-1"></span>
          </div>
          <Link href="/login" className="text-center" rel="noopener noreferrer">
            <span className="text-violet-900 text-base underline font-bold font-ubuntu">
              Entrar
            </span>
          </Link>
          <span className="text-slate-500 text-center text-xs">
            Ao continuar, voce concorda com os{" "}
            <Link
              href="/"
              className="text-violet-900 font-bold font-ubuntu underline cursor-pointer"
              rel="noopener noreferrer"
            >
              Termos de Servico
            </Link>{" "}
            e a{" "}
            <Link
              href="/"
              className="text-violet-900 font-bold font-ubuntu underline cursor-pointer"
              rel="noopener noreferrer"
            >
              Politica de Privacidade
            </Link>
          </span>
        </div>
      </div>
    </>
  );
}

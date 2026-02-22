import Image from "next/image";
import Link from "next/link";
import { LaminatedButton } from "@/components/ui/laminated";
import { Mail, Lock } from 'lucide-react';

export default function Login() {
  return (
    <div className="flex flex-col justify-center gap-4 h-screen p-4 md:px-8">
      <div className="flex flex-row justify-center items-center gap-2">
        <Image
          src="/images/logo.png"
          className="rounded-full"
          width="36"
          height="36"
          alt="trevo pass logo"
        />
        <p className="inline-flex gap-1 text-xl font-bold font-ubuntu">
          <span className="text-violet-900">Trevo</span>
          <span className="text-yellow-500">Pass</span>
        </p>
      </div>
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-slate-900 text-lg font-medium font-ubuntu">
          Entre na sua conta
        </h2>
        <p className="text-slate-500 text-sm text-center font-normal font-ubuntu">
          Continue acumulando pontos e resgatando prêmios
        </p>
      </div>
      <form className="flex flex-col gap-2">
        <div className="flex flex-row items-center gap-1 px-2 py-1 border border-slate-200 rounded-md focus-within:ring-2 focus-within:ring-violet-900">
          <label htmlFor="email" className="sr-only">E-mail</label>
          <Mail size={20} className="text-slate-500" aria-hidden="true" />
          <input id="email" name="email" type="email" placeholder="Seu e-mail" className="w-full text-slate-700 placeholder:text-slate-500 outline-none focus:outline-none focus-visible:ring-0 px-2 py-1" autoComplete="email" required />
        </div>
        <div className="flex flex-row items-center gap-1 px-2 py-1 border border-slate-200 rounded-md focus-within:ring-2 focus-within:ring-violet-900" >
          <label htmlFor="password" className="sr-only">Senha</label>
          <Lock size={20} className="text-slate-500" />
          <input id="password" name="password" type="password" placeholder="Sua senha" className="w-full text-slate-700 placeholder:text-slate-500 outline-none focus:outline-none focus-visible:ring-0 px-2 py-1" autoComplete="password" required />
        </div>
      <Link href="/" className="text-violet-900 text-right text-xs font-normal font-ubuntu">
        Esqueceu sua senha?
      </Link>
      </form>
      <div className="flex flex-col gap-3">
        <LaminatedButton>Entrar</LaminatedButton>
        <div className="flex flex-row items-center gap-2">
          <span className="border-t border-slate-300 flex-1"></span>
          <span className="text-slate-500 text-sm font-normal font-ubuntu">ou</span>
          <span className="border-b border-slate-300 flex-1"></span>
        </div>
        <a
          href="/register"
          className="border-2 border-violet-900 text-center rounded-md px-4 py-1.5"
          rel="noopener noreferrer"
        >
          <span className="text-violet-900 text-base font-bold font-ubuntu">
            Criar conta
          </span>
        </a>
      </div>
    </div>
  );
}

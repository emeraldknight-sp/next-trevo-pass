"use client";

import Image from "next/image";
import Link from "next/link";
import { LoginForm } from "./login-form";

export default function Login() {
  return (
    <div className="flex flex-col justify-center items-center gap-4 h-screen p-4 md:px-8">
      <Link
        href="/"
        className="flex flex-row justify-center items-center gap-2"
      >
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
      </Link>
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-slate-900 text-lg font-medium font-ubuntu">
          Entre na sua conta
        </h2>
        <p className="text-slate-500 text-sm text-center font-normal font-ubuntu">
          Continue acumulando pontos e resgatando prêmios
        </p>
      </div>
      <LoginForm />
      <div className="flex flex-col gap-3 w-full max-w-75">
        <div className="flex flex-row flex-1 items-center gap-2">
          <span className="border-t border-slate-300 flex-1"></span>
          <span className="text-slate-500 text-sm font-normal font-ubuntu">
            ou
          </span>
          <span className="border-b border-slate-300 flex-1"></span>
        </div>
        <Link
          href="/register"
          className="border-2 border-violet-900 text-center rounded-md px-4 py-1.5"
        >
          <span className="text-violet-900 text-base font-bold font-ubuntu">
            Criar conta
          </span>
        </Link>
      </div>
    </div>
  );
}

"use client";

import { ChevronRight, Clover, Gift, } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4">
      <section className="bg-linear-to-tr from-blue-900 to-violet-600 w-full rounded-t-4xl rounded-b-lg p-4">
        <span className="text-slate-100 text-lg font-ubuntu font-bold">Ola, fulano! 👋</span>
        <p className="text-slate-100 text-sm font-ubuntu font-bold"><span className="text-3xl text-yellow-400">1.240</span> pontos</p>
        <p>Barra de progresso aqui</p>
        <span className="text-xs text-slate-100 font-ubuntu font-medium">260 pts para virar VIP</span>
      </section>
      <ul className="flex flex-row justify-around w-full gap-2">
        <li className="bg-red-500 flex flex-col items-center rounded-md p-2">
          <p>Icone</p>
          <p className="text-slate-100 text-sm">Escanear</p>
        </li>
        <li className="bg-green-500 flex flex-col items-center rounded-md p-2">
          <p>Icone</p>
          <p className="text-slate-100 text-sm">Ver lojas</p>
        </li>
        <li className="bg-yellow-500 flex flex-col items-center rounded-md p-2">
          <p>Icone</p>
          <p className="text-slate-100 text-sm">Premios</p>
        </li>
        <li className="bg-blue-500 flex flex-col items-center rounded-md p-2">
          <p>Icone</p>
          <p className="text-slate-100 text-sm">Ver niveis</p>
        </li>
      </ul>
      <article className="bg-zinc-200/50 flex flex-col gap-2 w-full rounded-xl p-2">
        <section className="flex flex-col gap-2">
          <div className="flex flex-row justify-between">
            <h3 className="text-violet-950/80 text-sm font-ubuntu font-medium">Ultimas atividades</h3>
            <Link href="/history" className=""><ChevronRight size={16} className="text-slate-500" strokeWidth={3} /></Link>
          </div>
          <div className="bg-slate-100 flex flex-row justify-between items-center gap-3 rounded-xl p-2">
            <div className="bg-linear-to-tr from-yellow-600 to-yellow-500 rounded-xl p-2">
              <Clover size={20} className="text-yellow-200" />
            </div>
            <div className="flex flex-row justify-between items-center flex-1">
              <span className="text-slate-800 text-sm font-ubuntu font-medium">+50 pts loja X</span>
              <span className="text-slate-500 text-xs">2 min atras</span>
            </div>
          </div>
          <div className="bg-slate-100 flex flex-row justify-between items-center gap-3 rounded-xl p-2">
            <div className="bg-linear-to-tr from-violet-600 to-violet-500 rounded-xl p-2">
              <Gift size={20} className="text-violet-200" />
            </div>
            <div className="flex flex-row justify-between items-center flex-1">
              <span className="text-slate-800 text-sm font-ubuntu font-medium">+50 pts loja X</span>
              <span className="text-slate-500 text-xs">2 min atras</span>
            </div>
          </div>
          <div className="bg-slate-100 flex flex-row justify-between items-center gap-3 rounded-xl p-2">
            <div className="bg-linear-to-tr from-yellow-600 to-yellow-500 rounded-xl p-2">
              <Clover size={20} className="text-yellow-200" />
            </div>
            <div className="flex flex-row justify-between items-center flex-1">
              <span className="text-slate-800 text-sm font-ubuntu font-medium">+50 pts loja X</span>
              <span className="text-slate-500 text-xs">2 min atras</span>
            </div>
          </div>
        </section>
        <section>
          <h3 className="text-violet-950/80 text-sm font-ubuntu font-medium">Recompensas em destaque</h3>
          <ul>
            <li>
              Premio X
            </li>
            <li>
              Premio Y
            </li>
            <li>
              Premio Z
            </li>
          </ul>
        </section>
        <section>
          <h3 className="text-violet-950/80 text-sm font-ubuntu font-medium">Lojas parceiras</h3>
          <ul>
            <li>
              Live!
            </li>
            <li>
              American Card Express
            </li>
          </ul>
        </section>
      </article>
    </div>
  );
}

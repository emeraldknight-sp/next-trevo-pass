"use client";

import { logoutUser } from "@/services/auth.service";
import { toast } from "sonner";
import Link from "next/link";

export default function Dashboard() {
  const handleLogout = () => {
    logoutUser();
    toast.success("Saiu da conta!", {id: "logout-user"})
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2 p-4 h-screen">
      <span>Pagina interna do sistema</span>
      <span>
        Tente voltar para a{" "}
        <Link href="/" className="text-violet-900 font-bold">
          pagina inicial
        </Link>
      </span>
      <button type="button" onClick={handleLogout} className="border-2 border-violet-900 rounded-md px-4 py-2 mx-auto max-w-[250px]">
        botao pra deslogar do system, papai XD hehe!
      </button>
      <p className="text-center max-w-62.5">Bota pra quebrar meu parceiro, estala o codigo nessa maquina, maluco!!!! Tu eh o cara mermao!!</p>
    </div>
  );
}

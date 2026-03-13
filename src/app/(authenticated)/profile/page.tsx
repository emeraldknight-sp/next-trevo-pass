"use client";

import { logoutUser } from "@/features/auth/repositories/auth.repository";
import { toast } from "sonner";

export default function Profile() {
  const handleLogout = () => {
      logoutUser();
      toast.success("Saiu da conta!", {id: "logout-user"})
    };

  return (
    <div>
      <span>Pagina de perfil</span>
      <button type="button" onClick={handleLogout}>Sair da conta</button>
    </div>
  );
}

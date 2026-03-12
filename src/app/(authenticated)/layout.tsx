import { ProtectedRoute } from "@/components/auth/protected-route";
import Link from "next/link";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      {children}
      <div className="flex flex-row justify-between gap-3 p-4">
        <Link
          href="/dashboard"
          className="flex flex-col justify-center items-center"
        >
          <img src="/icons/home.png" className="w-8 h-8" />
          <span className="text-xs text-violet-900 font-medium">Home</span>
        </Link>
        <Link
          href="/points"
          className="flex flex-col justify-center items-center"
        >
          <img src="/icons/points.png" className="w-8 h-8" />
          <span className="text-xs text-violet-900 font-medium">Pontos</span>
        </Link>
        <Link
          href="/rewards"
          className="flex flex-col justify-center items-center"
        >
          <img src="/icons/rewards.png" className="w-8 h-8" />
          <span className="text-xs text-violet-900 font-medium">Resgates</span>
        </Link>
        <Link
          href="/profile"
          className="flex flex-col justify-center items-center"
        >
          <img src="/icons/profile.png" className="w-8 h-8" />
          <span className="text-xs text-violet-900 font-medium">Perfil</span>
        </Link>
      </div>
    </ProtectedRoute>
  );
}

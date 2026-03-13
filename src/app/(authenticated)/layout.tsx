import { ProtectedRoute } from "@/components/auth/protected-route";
import { Container } from "@/components/layout";
import { TabBar } from "@/components/layout/tab-bar";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <Container>
        {children}
        <TabBar />
      </Container>
    </ProtectedRoute>
  );
}

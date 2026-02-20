import Image from "next/image";
import { Container } from "./container";
import { LaminatedButton } from "../ui/laminated-button";

export const Header = () => {
  return (
    <header className="w-full bg-violet-800">
      <Container className="md:px-8 md:py-6 lg:px-12">
        <div className="flex flex-row justify-between items-center">
          <Image
            src="/images/logo.png"
            className="rounded-full"
            width={48}
            height={48}
            alt="logo trevo acai"
            priority
          />
          <div className="flex flex-row gap-2">
            <LaminatedButton as="a" color="slate" size="sm">
              Entrar
            </LaminatedButton>
            <LaminatedButton as="a" color="yellow" size="sm">
              Cadastre-se
            </LaminatedButton>
          </div>
        </div>
      </Container>
    </header>
  );
};

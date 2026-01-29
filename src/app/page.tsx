import { Gift, Smartphone, Star } from "lucide-react";
import Image from "next/image";

export default function Home() {

  const benefits = [
    {
      icon: <Star size={48}  />,
      title: "Ganhe Pontos",
      description: "Compre nas lojas e acumule pontos a cada compra"
    },
    {
      icon: <Gift size={48} />,
      title: "Resgate Prêmios",
      description: "Troque seus pontos por descontos e produtos"
    },
    {
      icon: <Smartphone size={48} />,
      title: "Benefícios Exclusivos",
      description: "Desbloqueie vantagens especiais e ofertas"
    },
  ]
  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <header className="flex flex-row justify-between items-center w-full p-4 bg-purple-500">
        <Image
          src="/images/acai-logo.jpg"
          className="rounded-full"
          width={48}
          height={48}
          alt="logo trevo acai"
          priority
        />
        <div>
          <a
          href="/"
          className="bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-700 px-6 py-3 rounded-2xl shadow-md transition"
        >
          <span className="text-base text-purple-500 font-semibold">Entrar</span>
        </a>
         <a
          href="/"
          className="bg-[#fec71c] hover:bg-yellow-500 active:bg-yellow-700 px-6 py-3 rounded-2xl shadow-md transition"
        >
          <span className="text-base text-purple-500 font-semibold">Cadastre-se</span>
        </a>
        </div>
      </header>
      <main>
        <div className="relative w-full h-[500px]">

        <Image
          src="/images/acai-1-vertical.jpg"
          className="object-cover"
          alt="hero trevo pass"
          priority
          fill
        />
        </div>
        <a href="" className="bg-yellow-600 hover:bg-yellow-700 active:bg-yellow-800 border-md shadow-md">
          <span className="text-3xl text-purple-800 font-bold">Cadastre-se Agora!</span>
        </a>
        <ul className="flex flex-col md:flex-row gap-4
         items-center justify-center px-4 py-24 md:py-8">
          {benefits.map((el, index) => (

          <li key={index} className="flex flex-row items-center gap-4 flex-1 bg-gray-200 p-4 rounded-md shadow-md">
            <span className="text-purple-800">{el.icon}</span>
            <div className="flex flex-col">
              <span className="text-xl text-purple-900 font-bold">{el.title}</span>
              <span className="text-sm text-purple-500 font-normal">{el.description}</span>
            </div>
            </li>
          ))}
        </ul>
        <div className="flex flex-col items-center gap-4 w-full">
          <a href="" className=""><span className="text-purple-600 text-lg font-medium">Acesse sua conta</span></a>
          <a href="" className="bg-purple-600 px-4 py-2 rounded-full"><span className="text-yellow-500 text-lg font-bold">Criar conta grátis</span></a>
        </div>
      </main>
      <footer className="bg-yellow-400 p-4">
        <div className="flex flex-col gap-1">
          <span className="text-xs text-purple-600 font-medium">
            <a href="" className="underline">Termos de uso</a>
            &nbsp;|&nbsp;
            <a href="" className="underline">Privacidade</a>
          </span>
          <span className="text-xs text-purple-600 font-medium">Versão do app 0.0.1</span>
          <span className="text-xs text-purple-600 font-medium">Desenvolvido por <a href="">David Almeida</a></span>
          <span className="text-xs text-purple-600 font-medium">Todos os direitos reservados &copy; {new Date().getFullYear()}</span>
        </div>
      </footer>
    </div>
  );
}

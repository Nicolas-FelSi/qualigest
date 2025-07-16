import ModalLogin from "../components/Modais/ModalLogin";
import ModalCadastro from "../components/Modais/ModalCadastro";
import Button from "../components/PaginaInicial/Button"
import MobileMenu from "../components/PaginaInicial/MobileMenu"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"

function PaginaInicial() {
  console.log("%cRenderizando a página: PAGINAINICIAL", "color: white; font-weight: bold;");
  const [modalState, setModalState] = useState({
    login: false,
    cadastro: false,
    menu: false,
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleModal = (modal) => {
    setModalState((prev) => ({ ...prev, [modal]: !prev[modal] }));
  };

  // useEffect para verificar o localStorage quando o componente montar
  useEffect(() => {
    const userIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(userIsLoggedIn);
  }, []);

  return (
    <div>
      <header className="bg-white flex justify-between items-center p-3 px-6 shadow-md">
        <h1 className="text-3xl lg:text-4xl font-semibold text-amber-600">
          Qualigest
        </h1>
        <nav className="hidden sm:flex sm:justify-between gap-6">
          {isLoggedIn ? (
            // Se estiver logado, mostra o botão para acessar o sistema
            <Link to="/projetos">
              <Button children={"Acessar Projetos"} />
            </Link>
          ) : (
            // Se não estiver logado, mostra os botões de Entrar e Cadastrar
            <>
              <Button children={"Entrar"} onClick={() => toggleModal("login")} />
              <Button children={"Cadastrar"} onClick={() => toggleModal("cadastro")} />
            </>
          )}
        </nav>
        <MobileMenu
          isOpen={modalState.menu}
          onOpenCadastro={() => toggleModal("cadastro")}
          onOpenLogin={() => toggleModal("login")}
          onToggle={() => toggleModal("menu")}
          isLoggedIn={isLoggedIn} // Passa o estado para o menu mobile
        />
      </header>
      <main className="flex items-center flex-col py-6 p-2">
        <h2 className="text-amber-600 text-2xl lg:text-3xl font-semibold">
          Bem-vindo ao QualiGest
        </h2>
        <p className="font-semibold text-lg text-center pt-4">
          Gerencie suas tarefas com eficiência e colaboração
        </p>
        <div className="py-12">
          <img src="/images/equipe-tarefa.png" alt="" />
        </div>
        <div className="grid gap-4 justify-center md:grid-cols-3 mx-2">
          <div className="bg-white p-6 rounded-sm flex flex-col gap-2 shadow-md">
            <img className="w-[150px]" src="/images/tarefas.webp" alt="" />
            <h2 className="text-lg font-semibold">Priorização de tarefas</h2>
            <p>Organize suas tarefas de acordo com a prioridade e prazo</p>
          </div>
          <div className="bg-white p-6 rounded-sm flex flex-col gap-2 shadow-md">
            <img className="w-[100px]" src="/images/prazo.png" alt="" />
            <h2 className="text-lg font-semibold">Gerenciamento de Prazos</h2>
            <p>Acompanhe os prazos de cada projeto com facilidade</p>
          </div>
          <div className="bg-white p-6 rounded-sm flex flex-col gap-2 shadow-md">
            <img className="w-[150px]" src="/images/equipe.png" alt="Imagem que representa priorização de tarefa" />
            <h2 className="text-lg font-semibold">Colaboração em Equipe</h2>
            <p>Trabalhe em conjunto atribuindo responsabilidades</p>
          </div>
        </div>
      </main>

      <ModalLogin
        isOpen={modalState.login}
        closeModal={() => toggleModal("login")}
        openModalCadastro={() => toggleModal("cadastro")}
      />
      <ModalCadastro
        isOpen={modalState.cadastro}
        closeModal={() => toggleModal("cadastro")}
        openModalLogin={() => toggleModal("login")}
      />
    </div>
  );
}

export default PaginaInicial;

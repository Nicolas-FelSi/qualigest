import ModalLogin from "../components/Modais/ModalLogin";
import ModalCadastro from "../components/Modais/ModalCadastro";
import { MdMenu } from "react-icons/md";
import { useState } from "react";

function PaginaInicial() {
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [isOpenCadastro, setIsOpenCadastro] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const toggleMenu = () => setIsOpenMenu(!isOpenMenu);

  const closeModalCadastro = () => setIsOpenCadastro(false);
  const openModalCadastro = () => setIsOpenCadastro(true);

  const closeModalLogin = () => setIsOpenLogin(false);
  const openModalLogin = () => setIsOpenLogin(true);

  return (
    <div>
      <header className="bg-white flex justify-between items-center p-3 px-6 shadow-md">
        <h1 className="text-3xl lg:text-4xl font-semibold text-amber-600">
          Qualigest
        </h1>
        <nav className="hidden sm:flex sm:justify-between gap-6">
          <button
            className="bg-blue-200 py-2 px-6 rounded-xs hover:bg-blue-400 transition-all font-semibold cursor-pointer"
            onClick={openModalLogin}
          >
            Entrar
          </button>
          <button
            className="bg-blue-200 py-2 px-6 rounded-xs hover:bg-blue-400 transition-all font-semibold cursor-pointer"
            onClick={openModalCadastro}
          >
            Cadastrar
          </button>
        </nav>
        <button
          className="relative group sm:hidden cursor-pointer"
          onClick={toggleMenu}
        >
          <MdMenu className="text-4xl text-amber-600" />
          {isOpenMenu && (
            <div className="absolute right-0 top-full bg-gray-100 shadow-lg z-10 rounded-lg">
              <div>
                <p
                  className="py-3 px-8 hover:bg-gray-500 hover:text-white rounded-t-lg transition-all"
                  onClick={openModalLogin}
                >
                  Entrar
                </p>
                <hr className="mx-[-0.05rem] opacity-10" />
                <p
                  className="py-3 px-8 hover:bg-gray-500 hover:text-white rounded-b-lg transition-all"
                  onClick={openModalCadastro}
                >
                  Cadastrar
                </p>
              </div>
            </div>
          )}
        </button>
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
            <img className="w-[150px]" src="/images/equipe.png" alt="" />
            <h2 className="text-lg font-semibold">Colaboração em Equipe</h2>
            <p>Trabalhe em conjunto atribuindo responsabilidades</p>
          </div>
        </div>
      </main>

      <ModalLogin
        isOpen={isOpenLogin}
        closeModal={closeModalLogin}
        openModalCadastro={openModalCadastro}
      />
      <ModalCadastro
        isOpen={isOpenCadastro}
        closeModal={closeModalCadastro}
        openModalLogin={openModalLogin}
      />
    </div>
  );
}

export default PaginaInicial;

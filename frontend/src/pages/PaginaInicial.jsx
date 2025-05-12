import ModalLogin from "../components/ModalLogin";
import ModalCadastro from "../components/ModalCadastro";
import { MdMenu } from "react-icons/md";
import { useState } from "react";

function PaginaInicial() {
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [isOpenCadastro, setIsOpenCadastro] = useState(false);

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
        <button type="button" className="sm:hidden cursor-pointer">
          <MdMenu className="text-4xl text-amber-600" />
        </button>
      </header>
      <main className="flex items-center flex-col my-5 p-2">
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
          <div className="bg-white p-6 rounded-sm flex flex-col gap-2 shadow-sm">
            <img className="w-[150px]" src="/images/tarefas.webp" alt="" />
            <h2 className="text-lg font-semibold">Priorização de tarefas</h2>
            <p>Organize suas tarefas de acordo com a prioridade e prazo</p>
          </div>
          <div className="bg-white p-6 rounded-sm flex flex-col gap-2 shadow-sm">
            <img className="w-[100px]" src="/images/prazo.png" alt="" />
            <h2 className="text-lg font-semibold">Gerenciamento de Prazos</h2>
            <p>Acompanhe os prazos de cada projeto com facilidade</p>
          </div>
          <div className="bg-white p-6 rounded-sm flex flex-col gap-2 shadow-sm">
            <img className="w-[150px]" src="/images/equipe.png" alt="" />
            <h2 className="text-lg font-semibold">Colaboração em Equipe</h2>
            <p>Trabalhe em conjunto atribuindo responsabilidades</p>
          </div>
        </div>
      </main>

      {/* <!-- Menu --> */}
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="menuPaginaInicial"
        aria-labelledby="menuPaginaInicialLabel"
      >
        <div className="offcanvas-header">
          <h5 className="" id="menuPaginaInicialLabel">
            QualiGest
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body p-0">
          <nav className="d-flex gap-4 flex-column text-center w-100">
            <a
              className="rounded-1 border-0 text-decoration-none border-bottom w-100"
              data-bs-toggle="modal"
              data-bs-target="#loginModal"
            >
              Entrar
            </a>
            <a
              className="rounded-1 border-0 text-decoration-none border-bottom w-100"
              data-bs-toggle="modal"
              data-bs-target="#cadastroModal"
            >
              Cadastrar
            </a>
          </nav>
        </div>
      </div>

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

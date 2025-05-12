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
        <button class="relative group sm:hidden cursor-pointer">
          <MdMenu className="text-4xl text-amber-600" />
          <div class="absolute left-0 top-full w-[600px] bg-white shadow-lg opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-all duration-300 z-10 p-6 rounded-lg">
            <div class="grid grid-cols-3 gap-4">
              <div>
                <h3 class="text-lg font-semibold text-gray-800 mb-2">Categoria 1</h3>
                <ul class="space-y-2">
                  <li><a href="#" class="text-gray-600 hover:text-blue-500">Item 1</a></li>
                  <li><a href="#" class="text-gray-600 hover:text-blue-500">Item 2</a></li>
                  <li><a href="#" class="text-gray-600 hover:text-blue-500">Item 3</a></li>
                </ul>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-800 mb-2">Categoria 2</h3>
                <ul class="space-y-2">
                  <li><a href="#" class="text-gray-600 hover:text-blue-500">Item 4</a></li>
                  <li><a href="#" class="text-gray-600 hover:text-blue-500">Item 5</a></li>
                  <li><a href="#" class="text-gray-600 hover:text-blue-500">Item 6</a></li>
                </ul>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-800 mb-2">Categoria 3</h3>
                <ul class="space-y-2">
                  <li><a href="#" class="text-gray-600 hover:text-blue-500">Item 7</a></li>
                  <li><a href="#" class="text-gray-600 hover:text-blue-500">Item 8</a></li>
                  <li><a href="#" class="text-gray-600 hover:text-blue-500">Item 9</a></li>
                </ul>
              </div>
            </div>
          </div>
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

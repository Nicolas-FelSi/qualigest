import { useEffect, useState } from "react";
import Aside from "../components/Aside";
import { MdSearch } from "react-icons/md";
import ModalCriarProjeto from "../components/ModalCriarProjeto";
import { useNavigate } from "react-router-dom";

function Projetos() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  useEffect(() => {
    if (!localStorage.getItem("isLoggedIn")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="flex gap-1 lg:gap-3">
      <Aside />
      <main className="w-full">
        <form className="px-2 py-2 bg-white flex flex-col gap-2 md:flex-row justify-between shadow-sm">
          <div className="flex w-full">
            <input
              type="text"
              id="pesquisa_projetos"
              className="rounded-s-lg bg-gray-50 border text-gray-900 w-full text-sm border-gray-300 p-2.5"
              placeholder="Pesquisar projetos"
              name="pesquisa_projetos"
            />
            <button
              type="submit"
              className="inline-flex items-center px-6 text-white text-2xl bg-gray-950 border border-gray-950 rounded-e-md"
            >
              <MdSearch />
            </button>
          </div>
        </form>
        <section className="mt-3 grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="bg-white shadow-sm">
            <h2 className="border-b border-gray-300 p-2 text-2xl text-amber-600">
              Marketing Digital
            </h2>
            <div className="py-2 px-5 text-center flex flex-col">
              <p className="bg-gray-500 py-0.5 px-3 rounded-md text-white">
                5 tarefas designadas para você
              </p>
              <p className="bg-amber-300 text-sm mt-2 py-0.5 px-3 rounded-md">
                1 tarefa está atrasada
              </p>
              <ul className="flex justify-end mt-4">
                <li>
                  <img
                    className="w-8 h-8 rounded-lg object-cover border border-gray-400"
                    src="/images/pessoa1.jpg"
                    alt=""
                  />
                </li>
                <li>
                  <img
                    className="w-8 h-8 rounded-lg object-cover border border-gray-400"
                    src="/images/pessoa2.jpg"
                    alt=""
                  />
                </li>
                <li>
                  <img
                    className="w-8 h-8 rounded-lg object-cover border border-gray-400"
                    src="/images/pessoa3.jpg"
                    alt=""
                  />
                </li>
                <li>
                  <img
                    className="w-8 h-8 rounded-lg object-cover border border-gray-400"
                    src="/images/pessoa4.jpg"
                    alt=""
                  />
                </li>
                <li>
                  <img
                    className="w-8 h-8 rounded-lg object-cover border border-gray-400"
                    src="/images/pessoa5.jpg"
                    alt=""
                  />
                </li>
              </ul>
            </div>
            <div className="flex gap-5 border-t border-gray-300 p-2">
              <button className="bg-amber-300 rounded-sm hover:bg-amber-500 cursor-pointer transition-all font-semibold p-2 w-full">
                Editar
              </button>
              <button className="bg-red-500 rounded-sm hover:bg-red-700 cursor-pointer transition-all font-semibold p-2 w-full">
                Deletar
              </button>
            </div>
          </div>
          <div className="bg-white shadow-sm">
            <h2 className="border-b border-gray-300 p-2 text-2xl text-amber-600">
              Marketing Digital
            </h2>
            <div className="py-2 px-5 text-center flex flex-col">
              <p className="bg-gray-500 py-0.5 px-3 rounded-md text-white">
                5 tarefas designadas para você
              </p>
              <p className="bg-amber-300 text-sm mt-2 py-0.5 px-3 rounded-md">
                1 tarefa está atrasada
              </p>
              <ul className="flex justify-end mt-4">
                <li>
                  <img
                    className="w-8 h-8 rounded-lg object-cover border border-gray-400"
                    src="/images/pessoa1.jpg"
                    alt=""
                  />
                </li>
                <li>
                  <img
                    className="w-8 h-8 rounded-lg object-cover border border-gray-400"
                    src="/images/pessoa2.jpg"
                    alt=""
                  />
                </li>
                <li>
                  <img
                    className="w-8 h-8 rounded-lg object-cover border border-gray-400"
                    src="/images/pessoa3.jpg"
                    alt=""
                  />
                </li>
                <li>
                  <img
                    className="w-8 h-8 rounded-lg object-cover border border-gray-400"
                    src="/images/pessoa4.jpg"
                    alt=""
                  />
                </li>
                <li>
                  <img
                    className="w-8 h-8 rounded-lg object-cover border border-gray-400"
                    src="/images/pessoa5.jpg"
                    alt=""
                  />
                </li>
              </ul>
            </div>
            <div className="flex gap-5 border-t border-gray-300 p-2">
              <button className="bg-amber-300 rounded-sm hover:bg-amber-500 cursor-pointer transition-all font-semibold p-2 w-full">
                Editar
              </button>
              <button className="bg-red-500 rounded-sm hover:bg-red-700 cursor-pointer transition-all font-semibold p-2 w-full">
                Deletar
              </button>
            </div>
          </div>
          <div className="bg-white shadow-sm flex justify-center items-center">
            <div 
              className="bg-gray-300 w-40 h-40 rounded-full flex items-center justify-center text-6xl cursor-pointer hover:scale-105 transition-all"
              onClick={openModal}
            >
              +
            </div>
          </div>
        </section>
      </main>

      <ModalCriarProjeto isOpen={isOpen} closeModal={closeModal} />
    </div>
  );
}

export default Projetos;

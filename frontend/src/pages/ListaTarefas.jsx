import { useState } from "react";
import Aside from "../components/Aside";
import ModalCriarTarefa from "../components/ModalCriarTarefa";
import { MdSearch } from "react-icons/md";

function ListaTarefas() {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  return (
    <>
      <div className="flex gap-1 lg:gap-3">
        <Aside />
        <main className="w-full">
          <form className="px-2 py-2 bg-white shadow-sm">
            <div className="flex w-full">
              <input
                type="text"
                id="pesquisa_tarefa"
                className="rounded-s-lg bg-gray-50 border text-gray-900 w-full text-sm border-gray-300 p-2.5"
                placeholder="Pesquisar tarefa"
                name="pesquisa_tarefa"
              />
              <button
                type="submit"
                className="inline-block my-3-flex items-center px-6 text-white text-2xl bg-gray-950 border border-gray-950 rounded-e-md"
              >
                <MdSearch />
              </button>
            </div>
            {/* BOTÃO VISÍVEL APENAS PARA COORDENADOR DO PROJETO */}
            <button
              className={`border-0 rounded-1 p-2 text-nowrap me-md-5`}
              type="button"
              onClick={openModal}
            >
              Nova tarefa
            </button>
          </form>
          <section className="mt-1 md:mt-3 gap-3 grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2">
            <div className="max-w-md bg-white border-gray-400 border p-3 rounded-md shadow-md hover:scale-105 transition-all cursor-pointer">
              <div className="flex justify-between">
                <h3 className="text-lg mr-1 font-medium mb-2">
                  Fazer tela criação de projetos
                </h3>
                <p>Pontos: 20</p>
              </div>
              <p className="text-sm md:text-lg">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Perferendis illum suscipit consequuntur vel distinctio quis
                aliquid dolor laudantium, nihil ipsum aperiam, ipsa possimus,
                sapiente modi natus corporis itaque! Eveniet, temporibus.
              </p>
              <p className="bg-gray-500 text-white rounded-md py-0 px-3 inline-block my-3 text-sm font-medium">
                Em andamento
              </p>
              <p className="bg-red-700 text-white rounded-md py-0 px-3 inline-block my-3 text-sm font-medium ml-2">
                Urgente
              </p>
              <p>Criada em: 13/05/2024</p>
              <p>Entrega em: 24/05/2024</p>
              <div className="flex mt-2">
                <img
                  className="w-7 h-7 object-cover rounded-full border border-gray-600"
                  src="/images/pessoa1.jpg"
                  alt=""
                />
                <img
                  className="w-7 h-7 object-cover rounded-full border border-gray-600"
                  src="/images/pessoa2.jpg"
                  alt=""
                />
                <img
                  className="w-7 h-7 object-cover rounded-full border border-gray-600"
                  src="/images/pessoa3.jpg"
                  alt=""
                />
              </div>
            </div>

            <div className="max-w-md bg-white border-gray-400 border p-3 rounded-md shadow-md hover:scale-105 transition-all cursor-pointer">
              <div className="flex justify-between">
                <h3 className="text-lg mr-1 font-medium mb-2">
                  Fazer tela criação de projetos
                </h3>
                <p>Pontos: 20</p>
              </div>
              <p className="text-sm md:text-lg">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Perferendis illum suscipit consequuntur vel distinctio quis
                aliquid dolor laudantium, nihil ipsum aperiam, ipsa possimus,
                sapiente modi natus corporis itaque! Eveniet, temporibus.
              </p>
              <p className="bg-gray-500 text-white rounded-md py-0 px-3 inline-block my-3 text-sm font-medium">
                Em andamento
              </p>
              <p className="bg-red-700 text-white rounded-md py-0 px-3 inline-block my-3 text-sm font-medium ml-2">
                Urgente
              </p>
              <p>Criada em: 13/05/2024</p>
              <p>Entrega em: 24/05/2024</p>
              <div className="flex mt-2">
                <img
                  className="w-7 h-7 object-cover rounded-full border border-gray-600"
                  src="/images/pessoa1.jpg"
                  alt=""
                />
                <img
                  className="w-7 h-7 object-cover rounded-full border border-gray-600"
                  src="/images/pessoa2.jpg"
                  alt=""
                />
                <img
                  className="w-7 h-7 object-cover rounded-full border border-gray-600"
                  src="/images/pessoa3.jpg"
                  alt=""
                />
              </div>
            </div>

            <div className="max-w-md bg-white border-gray-400 border p-3 rounded-md shadow-md hover:scale-105 transition-all cursor-pointer">
              <div className="flex justify-between">
                <h3 className="text-lg mr-1 font-medium mb-2">
                  Fazer tela criação de projetos
                </h3>
                <p>Pontos: 20</p>
              </div>
              <p className="text-sm md:text-lg">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Perferendis illum suscipit consequuntur vel distinctio quis
                aliquid dolor laudantium, nihil ipsum aperiam, ipsa possimus,
                sapiente modi natus corporis itaque! Eveniet, temporibus.
              </p>
              <p className="bg-gray-500 text-white rounded-md py-0 px-3 inline-block my-3 text-sm font-medium">
                Em andamento
              </p>
              <p className="bg-red-700 text-white rounded-md py-0 px-3 inline-block my-3 text-sm font-medium ml-2">
                Urgente
              </p>
              <p>Criada em: 13/05/2024</p>
              <p>Entrega em: 24/05/2024</p>
              <div className="flex mt-2">
                <img
                  className="w-7 h-7 object-cover rounded-full border border-gray-600"
                  src="/images/pessoa1.jpg"
                  alt=""
                />
                <img
                  className="w-7 h-7 object-cover rounded-full border border-gray-600"
                  src="/images/pessoa2.jpg"
                  alt=""
                />
                <img
                  className="w-7 h-7 object-cover rounded-full border border-gray-600"
                  src="/images/pessoa3.jpg"
                  alt=""
                />
              </div>
            </div>

            <div className="max-w-md bg-white border-gray-400 border p-3 rounded-md shadow-md hover:scale-105 transition-all cursor-pointer">
              <div className="flex justify-between">
                <h3 className="text-lg mr-1 font-medium mb-2">
                  Fazer tela criação de projetos
                </h3>
                <p>Pontos: 20</p>
              </div>
              <p className="text-sm md:text-lg">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Perferendis illum suscipit consequuntur vel distinctio quis
                aliquid dolor laudantium, nihil ipsum aperiam, ipsa possimus,
                sapiente modi natus corporis itaque! Eveniet, temporibus.
              </p>
              <p className="bg-gray-500 text-white rounded-md py-0 px-3 inline-block my-3 text-sm font-medium">
                Em andamento
              </p>
              <p className="bg-red-700 text-white rounded-md py-0 px-3 inline-block my-3 text-sm font-medium ml-2">
                Urgente
              </p>
              <p>Criada em: 13/05/2024</p>
              <p>Entrega em: 24/05/2024</p>
              <div>
                <img
                  className="w-7 h-7 object-cover rounded-full border border-gray-400"
                  src="/images/pessoa1.jpg"
                  alt=""
                />
                <img
                  className="w-7 h-7 object-cover rounded-full border border-gray-400"
                  src="/images/pessoa2.jpg"
                  alt=""
                />
                <img
                  className="w-7 h-7 object-cover rounded-full border border-gray-400"
                  src="/images/pessoa3.jpg"
                  alt=""
                />
              </div>
            </div>
          </section>
        </main>
      </div>

      <ModalCriarTarefa isOpen={isOpen} closeModal={closeModal}/>
    </>
  );
}

export default ListaTarefas;

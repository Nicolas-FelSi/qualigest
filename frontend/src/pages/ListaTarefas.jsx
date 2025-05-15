import { useEffect, useState } from "react";
import Aside from "../components/Aside";
import ModalCriarTarefa from "../components/Modais/ModalCriarTarefa";
import { MdSearch } from "react-icons/md";
import URL_BASE from "../utils/urlBase";
import { useNavigate } from "react-router-dom";

function ListaTarefas() {
  const urlBase = URL_BASE;
  const port = import.meta.env.VITE_PORT_BACKEND || 8080;
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

    async function getTasks() {
    try {
      const response = await fetch(
        `http://localhost${port != 80 ? `:${port}` : ""}${urlBase}/exibirTarefa.php`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      console.log(data)
      // setTasks(data.projetos);
    } catch (error) {
      console.error("Erro ao pegar tarefas:", error);
    }
  }

  useEffect(() => {
    getTasks();
  })

  useEffect(() => {
    if (!localStorage.getItem("isLoggedIn")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <div className="flex gap-1 lg:gap-3">
        <Aside />
        <main className="w-full">
          <form className="px-2 py-2 bg-white shadow-md flex flex-col gap-2 md:flex-row">
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
              className="bg-amber-600 rounded-md text-white font-medium py-2 px-6 text-nowrap hover:bg-amber-500 cursor-pointer transition-all hover:text-black"
              type="button"
              onClick={openModal}
            >
              Criar tarefa
            </button>
          </form>
          <section className="mt-1 md:mt-3 gap-3 grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2">
            <div className="w-full bg-white border-gray-400 border p-3 rounded-md shadow-md hover:scale-105 transition-all cursor-pointer">
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

            <div className="w-full bg-white border-gray-400 border p-3 rounded-md shadow-md hover:scale-105 transition-all cursor-pointer">
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

            <div className="w-full bg-white border-gray-400 border p-3 rounded-md shadow-md hover:scale-105 transition-all cursor-pointer">
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

            <div className="w-full bg-white border-gray-400 border p-3 rounded-md shadow-md hover:scale-105 transition-all cursor-pointer">
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

import { useEffect, useState } from "react";
import Aside from "../components/Aside";
import ModalCriarTarefa from "../components/Modais/ModalCriarTarefa";
import { MdSearch } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import getTasks from "../api/tasks/getTasks";
import TarefaCard from "../components/ListaTarefas/TarefaCard";

function ListaTarefas() {
  const navigate = useNavigate();
  const { idProjeto } = useParams();

  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState({}); 
  const [tasks, setTasks] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  useEffect(() => {
    getTasks(idProjeto);
  }, [])

  useEffect(() => {
    if (!localStorage.getItem("isLoggedIn")) {
      navigate("/");
    }

    let idToUse = idProjeto; // Pega da URL atual

    // 2. Lógica de sessionStorage e ID
    if (!idToUse || idToUse === 'undefined') {
      const lastId = sessionStorage.getItem('lastProjectId');
      if (lastId) {
        navigate(`/lista-tarefas/${lastId}`, { replace: true });
        return; 
      } else {
        setError("Nenhum projeto selecionado. Escolha um projeto primeiro.");
        setLoading(false);
        return; 
      }
    }

    // 3. Salvar o ID válido no sessionStorage
    sessionStorage.setItem('lastProjectId', idToUse);

    // 4. Buscar Tarefas (Função Async)
    const fetchTasks = async () => {
      setLoading(true);
      setError(null);
      const response = await getTasks(idToUse); 

      if (response && response.status === 'sucesso') {
        setTasks(response.tarefas || []); // <-- ATUALIZE O ESTADO!
      } else {
        // Use a mensagem da API ou uma padrão
        throw new Error(response?.messages || response?.mensagem || 'Erro ao buscar tarefas.');
      }

      setLoading(false);
    };

    fetchTasks();
  }, [idProjeto, navigate]);

  return (
    <>
      <div className="flex gap-2 lg:gap-4">
        <Aside />
        <main className="w-full mr-2 lg:mr-4">
          <form className="px-2 py-2 bg-white shadow-md flex flex-col gap-2 md:flex-row rounded-lg">
            <p>Projeto</p>
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
                className="inline-block my-3-flex items-center px-6 text-white text-2xl bg-amber-600 border border-amber-600 rounded-e-md"
              >
                <MdSearch />
              </button>
            </div>
            {/* BOTÃO VISÍVEL APENAS PARA COORDENADOR DO PROJETO */}
            <button
              className="bg-amber-600 rounded-md text-gray-950 font-medium py-2 px-6 text-nowrap hover:bg-amber-700 cursor-pointer transition-all hover:text-black"
              type="button"
              onClick={openModal}
            >
              Criar tarefa
            </button>
          </form>
          <section className="mt-2 md:mt-4 grid grid-cols-3 gap-4">
            <div>
              <p className="p-2 rounded-lg bg-white w-full text-center mb-2">Hoje</p>
              <div className="w-full bg-white border-gray-400 border p-3 rounded-md shadow-md cursor-pointer">
                <div className="flex justify-between">
                  <h3 className="text-lg mr-1 font-medium mb-2">
                    Titulo
                  </h3>
                  <p>Pontos: 20</p>
                </div>
                <p className="bg-gray-500 text-white rounded-md py-0 px-3 inline-block my-3 text-sm font-medium">
                  Em andamento
                </p>
                <p className="bg-red-700 text-white rounded-md py-0 px-3 inline-block my-3 text-sm font-medium ml-2">
                  Imediata
                </p>
                <p>Criada em: 21/04/2042</p>
                <p>Entrega em: 21/04/2042</p>
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
            </div>
          </section>
        </main>
      </div>

      <ModalCriarTarefa isOpen={isOpen} closeModal={closeModal} setTasks={setTasks}/>
    </>
  );
}

export default ListaTarefas;

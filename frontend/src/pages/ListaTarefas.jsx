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
            {
              tasks.map(task => (
                <TarefaCard key={task.id_tarefa} task={task} setTasks={setTasks}/>
              ))
            }
          </section>
        </main>
      </div>

      <ModalCriarTarefa isOpen={isOpen} closeModal={closeModal} setTasks={setTasks}/>
    </>
  );
}

export default ListaTarefas;

import { useCallback, useEffect, useMemo, useState } from "react";
import Aside from "../components/Aside";
import ModalCriarTarefa from "../components/Modais/ModalCriarTarefa";
import ModalTarefa from "../components/Modais/ModalTarefa";
import { useNavigate, useParams } from "react-router-dom";
import getTasks from "../api/tasks/getTasks";
import TarefaCard from "../components/ListaTarefas/TarefaCard";
import { parseISO, isToday, isTomorrow, format, compareAsc, isBefore } from "date-fns";
import { ptBR } from "date-fns/locale";
import showToast from "../utils/showToast";

function ListaTarefas() {
  const navigate = useNavigate();
  const { idProjeto } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [isUserProjectLeader, setIsUserProjectLeader] = useState(false);

  const [editingTaskId, setEditingTaskId] = useState(null);
  const [openGroups, setOpenGroups] = useState({});

  const toggleGroup = (groupKey) => {
    setOpenGroups(prevOpenGroups => ({
      ...prevOpenGroups, // Mantém o estado dos outros grupos
      [groupKey]: !prevOpenGroups[groupKey] // Inverte o estado do grupo clicado
    }));
  };

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  // --- Lógica de Agrupamento ---
  const agruparTarefasPorData = (tarefas) => {
    if (!tarefas || tarefas.length === 0) return [];

    const grupos = {};
    const agora = new Date();

    tarefas.forEach((tarefa) => {
      if (!tarefa.data_limite) return;

      const data = parseISO(tarefa.data_limite.replace(" ", "T"));
      let grupoKey;
      let grupoNome;
      let dataISO = tarefa.data_limite;

      if (isBefore(data, agora)) {
        grupoKey = "atrasadas";
        grupoNome = "Atrasadas";
        dataISO = '1970-01-01T00:00:00';
      } else if (isToday(data)) {
        grupoKey = "hoje";
        grupoNome = "Hoje";
      } else if (isTomorrow(data)) {
        grupoKey = "amanha";
        grupoNome = "Amanhã";
      } else {
        grupoKey = format(data, 'yyyy-MM-dd');
        grupoNome = format(data, "EEEE, dd 'de' MMMM", { locale: ptBR });
        grupoNome = grupoNome.charAt(0).toUpperCase() + grupoNome.slice(1);
      }

      if (!grupos[grupoKey]) {
        grupos[grupoKey] = { nome: grupoNome, dataISO: dataISO, tarefas: [] };
      }
      grupos[grupoKey].tarefas.push(tarefa);
    });

    const gruposOrdenados = Object.values(grupos).sort((a, b) => {
      if (a.nome === "Atrasadas") return -1;
      if (b.nome === "Atrasadas") return 1;
      if (a.nome === "Hoje") return -1;
      if (b.nome === "Hoje") return 1;
      if (a.nome === "Amanhã") return -1;
      if (b.nome === "Amanhã") return 1;
      
      return compareAsc(parseISO(a.dataISO), parseISO(b.dataISO));
    });

    return gruposOrdenados;
  };

  const fetchTasks = useCallback(async () => {
    // Usamos o idProjeto direto do hook useParams
    if (!idProjeto || idProjeto === "undefined") {
      // Lógica para lidar com projeto indefinido pode ser adicionada aqui se necessário
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await getTasks(idProjeto);
      const fetchedTasks = Array.isArray(response) ? response : [];
      setTasks(fetchedTasks);

      const initialOpenState = {};
      const grouped = agruparTarefasPorData(fetchedTasks);

      grouped.forEach(g => {
        initialOpenState[g.dataISO] = true;
      });

      setOpenGroups(initialOpenState);
    } catch (err) {
      console.error("Erro ao buscar tarefas:", err);
      setError(err.message || "Falha ao buscar tarefas.");
      setTasks([]);
    } finally {
      setLoading(false);
    }
  }, [idProjeto]);

  useEffect(() => {
    if (!localStorage.getItem("isLoggedIn")) {
      navigate("/");
      return;
    }

    let idToUse = idProjeto;

    if (!idToUse || idToUse === "undefined") {
      const lastId = sessionStorage.getItem("lastProjectId");
      if (lastId) {
        navigate(`/lista-tarefas/${lastId}`, { replace: true });
        return;
      } else {
        setError("Nenhum projeto selecionado. Escolha um projeto primeiro.");
        setLoading(false);
        return;
      }
    }

    sessionStorage.setItem("lastProjectId", idToUse);
    const projectDataString = sessionStorage.getItem("selectedProject");

    if (projectDataString) {
      const projectData = JSON.parse(projectDataString);
      setProjectName(projectData.nome_projeto);

      const loggedInUserId = localStorage.getItem("idUsuario");
      
      // Compara os IDs (convertendo o do localStorage para número)
      if (loggedInUserId && projectData.id_lider) {
        setIsUserProjectLeader(Number(loggedInUserId) === projectData.id_lider);
      }
    }

    fetchTasks();
  }, [idProjeto, navigate, fetchTasks]);

  const gruposDeTarefas = useMemo(() => agruparTarefasPorData(tasks), [tasks]);

  const handleTaskCreated = () => {
    fetchTasks(); // Apenas chama a função reutilizável
  };

  const handleOpenEditModal = (task) => {
    // Se o status da tarefa for 'Concluída', mostre um aviso e não faça nada.
    if (task.status === 'Concluída') {
      showToast('Tarefas concluídas não podem ser editadas.', 'info');
      return; // Impede a execução do resto da função
    }

    // Se não estiver concluída, abre o modal normalmente.
    setEditingTaskId(task.id_tarefa);
  };

  return (
    <>
      <div className="flex gap-2 lg:gap-4 h-screen">
        <Aside className="lg:sticky lg:top-0 lg:h-screen lg:z-30" />
        <main className="flex-1 flex flex-col overflow-y-auto pr-2 lg:pr-4">
          <div className="px-2 py-2 bg-white shadow-md flex flex-col justify-between items-center gap-2 md:flex-row rounded-lg lg:sticky lg:top-0 lg:z-20">
            <h2 className="text-2xl font-medium uppercase text-center">{projectName}</h2>
            {isUserProjectLeader && (
              <button
                className="bg-amber-600 rounded-md text-white font-medium py-2 px-6 text-nowrap hover:bg-amber-700 cursor-pointer transition-all focus:ring-2 focus:ring-amber-500 focus:outline-none"
                type="button"
                onClick={openModal}
              >
                Criar tarefa
              </button>
            )}
          </div>

          <div className="flex-grow flex flex-col pt-2 lg:pt-4">
            {loading && (
              <div className="flex-grow flex items-center justify-center">
                <p className="text-center text-lg text-gray-600">
                  Carregando tarefas...
                </p>
              </div>
            )}
            {error && (
              <div className="flex-grow flex items-center justify-center">
                <p className="text-center text-lg text-red-600">
                  Erro: {error}
                </p>
              </div>
            )}

            {!loading && !error && (
              <>
                {gruposDeTarefas.length > 0 ? (
                  <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 pb-4">
                    {gruposDeTarefas.map((grupo) => {
                      // Verifica se o grupo atual deve estar aberto
                      const isOpen = !!openGroups[grupo.dataISO];
                      return (
                        // O container de cada grupo agora é um item do acordeão
                        <div key={grupo.dataISO + "-" + grupo.nome}>
                          {/* O cabeçalho agora é um botão clicável */}
                          <button
                            onClick={() => toggleGroup(grupo.dataISO)}
                            className={`w-full p-3 text-white font-semibold text-lg flex justify-between items-center transition-colors duration-300
                              ${grupo.nome === 'Atrasadas' ? 'bg-red-700 hover:bg-red-700' : 'bg-blue-500 hover:bg-blue-600'}
                              ${isOpen ? 'rounded-t-lg' : 'rounded-lg'}` // Borda dinâmica
                            }
                          >
                            <span>{grupo.nome} ({grupo.tarefas.length})</span>
                            {/* Ícone de seta que gira com base no estado 'isOpen' */}
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              className={`h-6 w-6 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-90'}`} 
                              fill="none" 
                              viewBox="0 0 24 24" 
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                          
                          {/* A lista de tarefas só é renderizada se 'isOpen' for true */}
                          {/* Adicionamos classes para uma animação suave de abertura/fechamento */}
                          <div
                            className={`transition-all duration-500 ease-in-out overflow-hidden bg-gray-100 rounded-b-lg
                              ${isOpen ? 'max-h-[5000px] p-3' : 'max-h-0'}` // Padding é aplicado apenas quando aberto
                            }
                          >
                            <div className="space-y-3 p-1">
                              {grupo.tarefas.map((tarefa) => (
                                <div key={tarefa.id_tarefa} onClick={() => handleOpenEditModal(tarefa)}>
                                  <TarefaCard task={tarefa} onTaskStatusChanged={fetchTasks}/>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </section>
                ) : (
                  <div className="flex-grow flex items-center justify-center">
                    <p className="text-center text-lg text-gray-500">
                      Nenhuma tarefa encontrada para este projeto.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </main>
      </div>

      <ModalCriarTarefa
        isOpen={isOpen}
        closeModal={closeModal}
        onTaskCreated={handleTaskCreated}
      />

      {editingTaskId && (
        <ModalTarefa
          isOpen={!!editingTaskId}
          closeModal={() => setEditingTaskId(null)}
          taskId={editingTaskId}
          onTaskUpdated={() => {
            fetchTasks(); 
            setEditingTaskId(null); 
          }}
          canEdit={isUserProjectLeader}
        />
      )}
    </>
  );
}

export default ListaTarefas;
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
import Header from "../components/Header"; // Importe o Header

function ListaTarefas() {
  const navigate = useNavigate();
  const { idProjeto } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isUserProjectLeader, setIsUserProjectLeader] = useState(false);
  
  // O estado 'user' e 'projectName' continuam aqui
  const [user, setUser] = useState(null);
  const [projectName, setProjectName] = useState("");

  const [editingTaskId, setEditingTaskId] = useState(null);
  const [openGroups, setOpenGroups] = useState({});

  const toggleGroup = (groupKey) => {
    setOpenGroups(prevOpenGroups => ({
      ...prevOpenGroups,
      [groupKey]: !prevOpenGroups[groupKey]
    }));
  };

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  // A função agruparTarefasPorData não precisa de alterações
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

  // A função fetchTasks não precisa de alterações
  const fetchTasks = useCallback(async () => {
    if (!idProjeto || idProjeto === "undefined") {
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

  // O useEffect principal continua o mesmo
  useEffect(() => {
    if (!localStorage.getItem("isLoggedIn")) {
      navigate("/");
      return;
    }
    const userString = localStorage.getItem("user");
    if (userString) {
      setUser(JSON.parse(userString));
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
      if (loggedInUserId && projectData.id_lider) {
        setIsUserProjectLeader(Number(loggedInUserId) === projectData.id_lider);
      }
    }
    fetchTasks();
  }, [idProjeto, navigate, fetchTasks]);

  const gruposDeTarefas = useMemo(() => agruparTarefasPorData(tasks), [tasks]);

  const handleTaskCreated = () => { fetchTasks(); };

  const handleOpenEditModal = (task) => {
    if (task.status === 'Concluída') {
      showToast('Tarefas concluídas não podem ser editadas.', 'info');
      return;
    }
    setEditingTaskId(task.id_tarefa);
  };

  return (
    <>
      <div className="flex gap-2 lg:gap-4 h-screen">
        <Aside />
        <main className="flex-1 flex flex-col overflow-y-auto pr-2 lg:pr-4">
          <Header titleHeader={projectName} user={user} />
          {isUserProjectLeader && (
            <div className="flex justify-end mb-4">
              <button
                className="bg-amber-600 rounded-md text-white font-medium py-2 px-6 hover:bg-amber-700 cursor-pointer transition-all focus:ring-2 focus:ring-amber-500 focus:outline-none"
                type="button"
                onClick={openModal}
              >
                Criar tarefa
              </button>
            </div>
          )}
          
          <div className="flex-grow flex flex-col">
            {loading && (
              <div className="flex-grow flex items-center justify-center"><p>Carregando tarefas...</p></div>
            )}
            {error && (
              <div className="flex-grow flex items-center justify-center"><p className="text-red-600">Erro: {error}</p></div>
            )}
            {!loading && !error && (
              <>
                {gruposDeTarefas.length > 0 ? (
                  <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 pb-4">
                    {gruposDeTarefas.map((grupo) => {
                      const isOpen = !!openGroups[grupo.dataISO];
                      return (
                        <div key={grupo.dataISO + "-" + grupo.nome}>
                          <button
                            onClick={() => toggleGroup(grupo.dataISO)}
                            className={`w-full p-3 text-white font-semibold text-lg flex justify-between items-center transition-colors duration-300
                              ${grupo.nome === 'Atrasadas' ? 'bg-red-700 hover:bg-red-800' : 'bg-blue-500 hover:bg-blue-600'}
                              ${isOpen ? 'rounded-t-lg' : 'rounded-lg'}`
                            }
                          >
                            <span>{grupo.nome} ({grupo.tarefas.length})</span>
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              className={`h-6 w-6 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`} 
                              fill="none" 
                              viewBox="0 0 24 24" 
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                          <div
                            className={`transition-all duration-500 ease-in-out overflow-hidden bg-gray-100 rounded-b-lg
                              ${isOpen ? 'max-h-[5000px] p-3' : 'max-h-0'}`
                            }
                          >
                            <div className="space-y-3">
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
                    <p className="text-center text-lg text-gray-500">Nenhuma tarefa encontrada para este projeto.</p>
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
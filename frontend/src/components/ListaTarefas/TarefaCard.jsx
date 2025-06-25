import { format, parseISO } from "date-fns";
import completeTask from "../../api/tasks/completeTask"
import handleImageProfile from "../../utils/handleImageProfile";
import showToast from "../../utils/showToast";

function TarefaCard({ task, onTaskStatusChanged }) {
  const loggedInUserId = Number(localStorage.getItem("idUsuario"));

  const isUserResponsible = task.responsaveis.some(
    (user) => user.id_usuario === loggedInUserId
  );

  const canCompleteTask = isUserResponsible && task.status !== 'concluída';

  const handleToggleComplete = async (e) => {
    // Essencial: Impede que o clique no checkbox abra o modal de detalhes.
    e.stopPropagation();

    if (!canCompleteTask) {
      e.preventDefault();
      showToast("Apenas responsáveis podem concluir esta tarefa.", "info");
      return;
    }

    // Uma confirmação opcional, mas recomendada
    const confirmationText = task.status === 'concluída' 
      ? 'Deseja reabrir esta tarefa?'
      : 'Deseja marcar esta tarefa como concluída?';
      
    if (!confirm(confirmationText)) {
      e.preventDefault(); // Impede que o checkbox mude de estado visualmente se o usuário cancelar
      return;
    }

    try {
      const result = await completeTask(task.id_tarefa);
      if (result.mensagem) {
        showToast(result.mensagem || "Status da tarefa atualizado!", "success");
        // Avisa o componente pai (ListaTarefas) que a lista precisa ser recarregada
        if (onTaskStatusChanged) {
          onTaskStatusChanged();
        }
      } else {
        e.preventDefault(); // Impede a mudança visual se der erro
        showToast(result.erro || "Erro ao atualizar status.", "error");
      }
    } catch (error) {
      e.preventDefault();
      console.error("Erro ao concluir tarefa:", error);
      showToast("Ocorreu um erro inesperado.", "error");
    }
  };

  const isCompleted = task.status === 'concluída';
  const cardStyles = isCompleted 
    ? 'bg-gray-100 opacity-60 cursor-not-allowed' 
    : 'bg-white hover:scale-[1.02] cursor-pointer';

  const titleStyles = isCompleted ? 'line-through text-gray-500' : 'text-gray-800';

  return (
    <div className={`w-full border-gray-400 border p-4 rounded-md shadow-md transition-all ${cardStyles}`}>
      <div className="flex justify-between items-start gap-2">
        <div className="flex flex-1 items-start gap-3 min-w-0">
          <input
            type="checkbox"
            className={`mt-1 h-5 w-5 accent-green-600 ${isCompleted ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            checked={isCompleted}
            onClick={handleToggleComplete}
            // ADICIONE a propriedade 'disabled' para bloquear o checkbox
            disabled={!canCompleteTask}
            onChange={() => {}} 
          />
          <h3 className={`text-lg font-medium mb-2 ${titleStyles} overflow-ellipsis overflow-hidden whitespace-nowrap`}>
            {task.titulo}
          </h3>
        </div>
        <p className={`font-semibold ${isCompleted ? 'text-gray-500' : ''}`}>
           {task.pontuacao_Tarefa || 0} pts
        </p>
      </div>

      <div className="pl-8"> {/* Adiciona um recuo para alinhar com o título */}
        <p className="bg-gray-500 text-white rounded-md py-0 px-3 inline-block my-1 text-sm font-medium">
          {task.status}
        </p>
        <p
          className={`${
            task.prioridade === "baixa" ? "bg-slate-400"
            : task.prioridade === "moderada" ? "bg-yellow-400"
            : task.prioridade === "alta" ? "bg-red-400"
            : "bg-red-700"
          } text-white rounded-md py-0 px-3 inline-block my-1 text-sm font-medium ml-2`}
        >
          {task.prioridade}
        </p>
        <p className="text-sm text-gray-600 mt-2">Inicia em: {format(parseISO(task.data_inicio.replace(" ", "T")), "dd/MM/yyyy HH:mm")}</p>
        <p className="text-sm text-gray-600">Termina em: {format(parseISO(task.data_limite.replace(" ", "T")), "dd/MM/yyyy HH:mm")}</p>
        <div className="flex mt-2">
          {task.responsaveis.map(responsavel => {
            const imagemSrc = handleImageProfile(responsavel.foto);
            return (
              <img
                key={responsavel.id_usuario}
                className="w-7 h-7 object-cover rounded-full border border-gray-600"
                src={imagemSrc}
                alt={responsavel.nome_completo}
                title={responsavel.nome_completo}
              />
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default TarefaCard;

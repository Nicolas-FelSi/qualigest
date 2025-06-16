import URL_BASE from "../../utils/urlBase";

const urlBase = URL_BASE;
const port = import.meta.env.VITE_PORT_BACKEND || 8080;

const editTask = async (taskId, dataTask) => {
  try {
    const response = await fetch(
      `http://localhost${
        port != 80 ? `:${port}` : ""
      }${urlBase}/editarTarefa.php`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_tarefa: taskId,
          data_inicio: dataTask.data_inicio,
          data_limite: dataTask.data_limite,
          descricao: dataTask.descricao,
          id_projeto: dataTask.id_projeto,
          ids_responsaveis: dataTask.ids_responsaveis,
          multiplicador: dataTask.multiplicador,
          prioridade: dataTask.prioridade,
          titulo: dataTask.titulo,
        }),
      }
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Erro ao editar tarefa:", error);
  }
};

export default editTask;

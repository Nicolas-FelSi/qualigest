import URL_BASE from "../urlBase";

const urlBase = URL_BASE;

const editTask = async (taskId, dataTask) => {
  try {
    const response = await fetch(
      `${urlBase}/editarTarefa.php`,
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

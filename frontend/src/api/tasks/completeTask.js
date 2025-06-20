import URL_BASE from "../urlBase";

const urlBase = URL_BASE;

const completeTask = async (taskId) => {
  try {
    const response = await fetch(
      `${urlBase}/entregarTarefa.php`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_tarefa: taskId,
        }),
      }
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Erro ao concluir tarefa:", error);
  }
};

export default completeTask;

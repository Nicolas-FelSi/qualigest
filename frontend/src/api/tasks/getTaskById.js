import URL_BASE from "../urlBase";

const urlBase = URL_BASE;

const getTaskById = async (id) => {
  try {
    const response = await fetch(
      `${urlBase}/exibirTarefa.php?id_tarefa=${id}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Erro ao buscar tarefa:", error);
  }
};

export default getTaskById;

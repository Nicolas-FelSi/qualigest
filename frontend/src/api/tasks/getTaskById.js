import URL_BASE from "../../utils/urlBase";

const urlBase = URL_BASE;
const port = import.meta.env.VITE_PORT_BACKEND || 8080;

const getTaskById = async (id) => {
  try {
    const response = await fetch(
      `http://localhost${
        port != 80 ? `:${port}` : ""
      }${urlBase}/exibirTarefa.php?id_tarefa=${id}`,
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

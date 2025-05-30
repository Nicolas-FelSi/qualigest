import URL_BASE from "../../utils/urlBase";

const urlBase = URL_BASE;
const port = import.meta.env.VITE_PORT_BACKEND || 8080;

const deleteProject = async (id_project) => {
  try {
    const response = await fetch(
      `http://localhost${
        port != 80 ? `:${port}` : ""
      }${urlBase}/excluirProjeto.php`,
      {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id_projeto: id_project }),
      }
    );

    const data = await response.json();
    
    return data;
  } catch (error) {
    console.error("Erro ao deletar o projeto:", error);
  }
};

export default deleteProject;

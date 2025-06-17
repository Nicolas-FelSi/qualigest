import URL_BASE from "../urlBase";

const urlBase = URL_BASE;

const deleteProject = async (id_project) => {
  try {
    const response = await fetch(
      `${urlBase}/excluirProjeto.php`,
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

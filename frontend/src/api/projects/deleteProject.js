import { toast } from "react-toastify";
import URL_BASE from "../../utils/urlBase";
import getProjects from "./getProjects";

const urlBase = URL_BASE;
const port = import.meta.env.VITE_PORT_BACKEND || 8080;

const deleteProject = async (e, project, setProjects) => {
  e.preventDefault();

  const escolha = confirm("Deseja deletar este projeto?");

  if (escolha) {
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
          body: JSON.stringify({ id_projeto: project.id_projeto }),
        }
      );

      const data = await response.json();

      if (data.status === "sucesso") {
        const notify = () => toast.success(data.mensagem);
        notify();
      } else {
        const notify = () => toast.error(data.mensagem);
        notify();
      }
      getProjects(setProjects);
    } catch (error) {
      console.error("Erro ao deletar o projeto:", error);
    }
  }
};

export default deleteProject;

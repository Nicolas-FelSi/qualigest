import { toast } from "react-toastify";
import URL_BASE from "../../utils/urlBase";
import getProjects from "./getProject";

const urlBase = URL_BASE;
const port = import.meta.env.VITE_PORT_BACKEND || 8080;

const createProject = async (e, formData, setFormData, closeModal, setProjects) => {
  e.preventDefault();

  if (formData.nome_projeto == "") {
    alert("Preencha todos os campos!");
    return;
  }

  try {
    const response = await fetch(
      `http://localhost${
        port != 80 ? `:${port}` : ""
      }${urlBase}/criarProjeto.php`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    const data = await response.json();

    if (data.status === "sucesso") {
      closeModal();
      setFormData({
        nome_projeto: "",
      });

      const notify = () => toast.success(data.mensagem);
      notify();
    } else {
      const notify = () => toast.error(data.mensagem);
      notify();
    }
    getProjects(setProjects);
  } catch (error) {
    console.error("Erro ao criar projeto:", error);
  }
};

export default createProject;

import URL_BASE from "../../utils/urlBase";

const urlBase = URL_BASE;
const port = import.meta.env.VITE_PORT_BACKEND || 8080;

async function getTasks(projectId) {
    try {
        const response = await fetch(
            `http://localhost${port != 80 ? `:${port}` : ""}${urlBase}/listarTarefasProjeto.php?id_projeto=${projectId}`,
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
        console.error("Erro ao listar tarefas:", error);
    }
}

export default getTasks;
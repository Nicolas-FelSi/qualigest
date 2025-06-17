import URL_BASE from "../urlBase";

const urlBase = URL_BASE;

async function getTasks(projectId) {
    try {
        const response = await fetch(
            `${urlBase}/listarTarefasProjeto.php?id_projeto=${projectId}`,
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
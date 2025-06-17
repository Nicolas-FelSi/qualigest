import URL_BASE from "./urlBase";

const urlBase = URL_BASE;

async function getUsersByProject(idProject) {
    try {
        const response = await fetch(
        `${urlBase}/buscarUsuariosProjeto.php?id_projeto=${idProject}`,
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
        console.error("Erro ao listar usuários:", error);
    }
}

export default getUsersByProject;
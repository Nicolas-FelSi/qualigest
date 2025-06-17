import URL_BASE from "./urlBase";

const urlBase = URL_BASE;

async function getUsers(projectId) {
    try {
        const response = await fetch(
        `${urlBase}/detalhesProjeto.php?id_projeto=${projectId}`,
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
        console.error("Erro ao pegar dados do projeto:", error);
    }
}

export default getUsers;
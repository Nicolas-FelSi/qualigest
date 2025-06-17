import URL_BASE from "../urlBase";

const urlBase = URL_BASE;

async function getProjects() {
    try {
        const response = await fetch(
        `${urlBase}/exibirProjeto.php`,
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
        console.error("Erro ao listar projetos:", error);
    }
}

export default getProjects;
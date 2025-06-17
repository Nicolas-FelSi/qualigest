import URL_BASE from "../urlBase";

const urlBase = URL_BASE;

async function editProject(formData) {
    try {
        const response = await fetch(
        `${urlBase}/editarProjeto.php`,
        {
            method: "PUT",
            credentials: "include",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        }
        );

        const data = await response.json();

        return data;
    } catch (error) {
        console.error("Erro ao editar projeto:", error);
    }
}

export default editProject;
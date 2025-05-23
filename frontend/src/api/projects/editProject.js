import URL_BASE from "../../utils/urlBase";

const urlBase = URL_BASE;
const port = import.meta.env.VITE_PORT_BACKEND || 8080;

async function editProject(formData) {
    try {
        const response = await fetch(
        `http://localhost${
            port != 80 ? `:${port}` : ""
        }${urlBase}/editarProjeto.php`,
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
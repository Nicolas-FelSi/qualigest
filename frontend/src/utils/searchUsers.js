import URL_BASE from "../utils/urlBase";

const urlBase = URL_BASE;
const port = import.meta.env.VITE_PORT_BACKEND || 8080;

async function getUsers(setUsers) {
    try {
        const response = await fetch(
        `http://localhost${port != 80 ? `:${port}` : ""}${urlBase}/buscarUsuarios.php`,
        {
            method: "GET",
            credentials: "include",
            headers: {
            "Content-Type": "application/json",
            },
        }
        );

        const data = await response.json();

        console.log(data)
        // setUsers(data.projetos);
    } catch (error) {
        console.error("Erro ao listar usuários:", error);
    }
}

export default getUsers;
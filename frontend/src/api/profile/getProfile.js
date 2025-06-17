import URL_BASE from "../urlBase";

const urlBase = URL_BASE;

async function getProfile() {
    try {
    const response = await fetch(
        `${urlBase}/perfil.php`,
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
        console.error("Erro ao pegar perfil:", error);
    }
}

export default getProfile;
import URL_BASE from "./urlBase"

const urlBase = URL_BASE;

async function handleLogin(formData) {
    try {
        const response = await fetch(
        `${urlBase}/login.php`,
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

        return data;
    } catch (error) {
        console.error("Erro ao logar:", error);
    }
}

export default handleLogin;
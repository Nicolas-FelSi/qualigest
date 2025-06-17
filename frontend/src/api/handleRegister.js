import URL_BASE from "./urlBase";

const urlBase = URL_BASE;

async function handleRegister(formData) {
    try {
        const response = await fetch(
        `${urlBase}/cadastroUsuario.php`,
        {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        }
        );

        const data = await response.json();

        return data;
    } catch (error) {
        console.error("Erro ao cadastrar:", error);
    }
}

export default handleRegister;
import URL_BASE from "../utils/urlBase";

  const urlBase = URL_BASE;
  const port = import.meta.env.VITE_PORT_BACKEND || 8080;

async function handleRegister(formData) {
    try {
        const response = await fetch(
        `http://localhost${
            port != 80 ? `:${port}` : ""
        }${urlBase}/cadastroUsuario.php`,
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
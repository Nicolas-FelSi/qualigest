import URL_BASE from "../urlBase";

const urlBase = URL_BASE;

const createTask = async (formData) => {
  try {
    const response = await fetch(
      `${urlBase}/criarTarefa.php`,
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
    console.error("Erro ao criar tarefa:", error);
  }
};

export default createTask;

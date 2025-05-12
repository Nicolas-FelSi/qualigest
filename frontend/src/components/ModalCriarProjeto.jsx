import { useState } from "react";
import { toast } from "react-toastify";
import URL_BASE from "../urlBase";

function ModalCriarProjeto({ isOpen, closeModal }) {
  const urlBase = URL_BASE;
  const port = import.meta.env.VITE_PORT_BACKEND || 8080;

  const [formData, setFormData] = useState({
    nome_projeto: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.nome_projeto == "") {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost${
          port != 80 ? `:${port}` : ""
        }${urlBase}/criarProjeto.php`,
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

      if (data.status === "sucesso") {
        closeModal();
        setFormData({
          nome_projeto: "",
        });

        const notify = () => toast.success(data.mensagem);
        notify();
      } else {
        const notify = () => toast.error(data.mensagem);
        notify();
      }
    } catch (error) {
      console.error("Erro ao criar projeto:", error);
    }
  };

  if (isOpen) {
    return (
      <div
        className="inset-0 bg-black/75 fixed flex items-center justify-center"
        onClick={closeModal}
      >
        <form
          className="bg-white p-5 rounded-lg w-lg mx-2"
          noValidate
          onSubmit={handleSubmit}
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-xl text-gray-900 font-semibold">Criar projeto</h2>
          <hr className="mx-[-1.3rem] opacity-15 mt-4" />
          <div className="mt-2">
            <label
              htmlFor="inputNomeProjeto"
              className="mb-2 text-sm font-medium"
            >
              Nome do projeto
            </label>
            <div className="flex">
              <input
                type="text"
                id="inputNomeProjeto"
                className="rounded-lg bg-gray-50 border text-gray-900 w-full text-sm border-gray-300 p-2.5"
                placeholder="Informe o nome do projeto"
                name="nome_projeto"
                value={formData.nome_projeto}
                onChange={(e) => setFormData({nome_projeto: e.target.value})}
              />
            </div>
          </div>
          <hr className="mx-[-1.3rem] mt-5 opacity-15" />
          <div>
            <button
              type="submit"
              className="bg-black w-full rounded-sm mt-4 p-2 text-white cursor-pointer hover:bg-black/85 transition-all"
            >
              Criar projeto
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default ModalCriarProjeto;

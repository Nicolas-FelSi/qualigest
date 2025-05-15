import { useState } from "react";
import createProject from "../../api/projects/createProject";
import getUsers from "../../utils/searchUsers";

function ModalCriarProjeto({ isOpen, closeModal, setProjects }) {
  const [formData, setFormData] = useState({
    nome_projeto: "",
  });

  const handleSubmit = async (e) => {
    createProject(e, formData, setFormData, closeModal, setProjects);
    getUsers()
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

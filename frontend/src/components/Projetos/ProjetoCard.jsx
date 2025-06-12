import { useState } from "react";
import ModalEditarProjeto from "../Modais/ModalEditarProjeto";
import deleteProject from "../../api/projects/deleteProject";
import { useNavigate } from "react-router-dom";
import showToast from "../../utils/showToast";

function ProjetoCard({ project, setProjects } ) {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => setIsOpen(false);
  const openModal = (e) => {
    e.stopPropagation();

    setIsOpen(true);
  }

  const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const escolha = confirm("Deseja deletar este projeto?");
    if (escolha) {
      const data = await deleteProject(project.id_projeto);

      if (data.status === "sucesso") {
        showToast(data.mensagem, "success");
      } else {
        showToast(data.mensagem);
      }

      setProjects(projetosAtuais =>
        projetosAtuais.filter(p => p.id_projeto !== project.id_projeto)
      );
    }

  }

  const handleNavigateToTaskList = (projectId) => {
    sessionStorage.setItem("selectedProject", JSON.stringify({
      id_projeto: projectId,
      id_lider: project.id_lider,
      nome_projeto: project.nome_projeto
    }));
    navigate(`/lista-tarefas/${projectId}`);
  }

  return (
    <div className="bg-white shadow-md rounded-md border border-gray-400" onClick={()=>handleNavigateToTaskList(project.id_projeto)}>
      <div className="border-b border-gray-300 flex justify-between items-center p-2">
        <h2 className="text-2xl text-amber-600">
          {project.nome_projeto}
        </h2>
        <img
          className="w-8 h-8 rounded-lg object-cover border border-gray-400"
          src="/images/pessoa1.jpg"
          alt=""
        />
      </div>
      <p className="font-semibold uppercase text-gray-800 text-3xl pt-5 text-center">{project.pontuacao_projeto == null ? "0" : project.pontuacao_projeto} pts</p>
      <div className="py-2 px-5 text-center flex flex-col">
        <ul className="flex justify-end mt-4">
          <li>
            <img
              className="w-8 h-8 rounded-lg object-cover border border-gray-400"
              src="/images/pessoa1.jpg"
              alt=""
            />
          </li>
          <li>
            <img
              className="w-8 h-8 rounded-lg object-cover border border-gray-400"
              src="/images/pessoa2.jpg"
              alt=""
            />
          </li>
          <li>
            <img
              className="w-8 h-8 rounded-lg object-cover border border-gray-400"
              src="/images/pessoa3.jpg"
              alt=""
            />
          </li>
          <li>
            <img
              className="w-8 h-8 rounded-lg object-cover border border-gray-400"
              src="/images/pessoa4.jpg"
              alt=""
            />
          </li>
          <li>
            <img
              className="w-8 h-8 rounded-lg object-cover border border-gray-400"
              src="/images/pessoa5.jpg"
              alt=""
            />
          </li>
        </ul>
      </div>
      <div className="flex gap-5 border-t border-gray-300 p-2">
        <button className="border border-amber-600 text-gray-900 rounded-sm hover:bg-amber-600 hover:text-white cursor-pointer transition-all font-semibold p-2 w-full" onClick={openModal}>
          Editar
        </button>
        <button className="bg-red-800 rounded-sm hover:bg-red-950 text-white cursor-pointer transition-all font-semibold p-2 w-full" onClick={handleDelete}>
          Deletar
        </button>
      </div>

      <ModalEditarProjeto isOpen={isOpen} closeModal={closeModal} data={project} setProjects={setProjects}/>
    </div>
  );
}

export default ProjetoCard;

import { useState } from "react";
import ModalEditarProjeto from "../Modais/ModalEditarProjeto";
import deleteProject from "../../api/projects/deleteProject";
import { useNavigate } from "react-router-dom";

function ProjetoCard({ project, setProjects } ) {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => setIsOpen(false);
  const openModal = (e) => {
    e.stopPropagation();

    setIsOpen(true);
  }

  const handleDelete = async (e) => {
    e.stopPropagation();

    await deleteProject(e, project);
    setProjects(projetosAtuais =>
      projetosAtuais.filter(p => p.id_projeto !== project.id_projeto)
    );
  }

  const handleNavigateToTaskList = (projectId) => {
    navigate(`/lista-tarefas/${projectId}`);
  }

  return (
    <div className="bg-white shadow-md rounded-md border border-gray-400" onClick={()=>handleNavigateToTaskList(project.id_projeto)}>
      <h2 className="border-b border-gray-300 p-2 text-2xl text-amber-600">
        {project.nome_projeto}
      </h2>
      <div className="py-2 px-5 text-center flex flex-col">
        <p className="bg-gray-500 py-0.5 px-3 rounded-md text-white">
          5 tarefas designadas para você
        </p>
        <p className="bg-amber-300 text-sm mt-2 py-0.5 px-3 rounded-md">
          1 tarefa está atrasada
        </p>
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
        <button className="bg-blue-300 rounded-sm hover:bg-blue-500 text-white cursor-pointer transition-all font-semibold p-2 w-full" onClick={openModal}>
          Editar
        </button>
        <button className="bg-gray-500 rounded-sm hover:bg-gray-700 text-white cursor-pointer transition-all font-semibold p-2 w-full" onClick={handleDelete}>
          Deletar
        </button>
      </div>

      <ModalEditarProjeto isOpen={isOpen} closeModal={closeModal} data={project} setProjects={setProjects}/>
    </div>
  );
}

export default ProjetoCard;

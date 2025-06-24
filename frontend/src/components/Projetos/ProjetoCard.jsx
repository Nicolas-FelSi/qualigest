import { useState } from "react";
import ModalEditarProjeto from "../Modais/ModalEditarProjeto";
import deleteProject from "../../api/projects/deleteProject";
import { useNavigate } from "react-router-dom";
import showToast from "../../utils/showToast";
import handleImageProfile from "../../utils/handleImageProfile";

function ProjetoCard({ project, setProjects }) {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => setIsOpen(false);
  const openModal = (e) => {
    e.stopPropagation();

    setIsOpen(true);
  };

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

      setProjects((projetosAtuais) =>
        projetosAtuais.filter((p) => p.id_projeto !== project.id_projeto)
      );
    }
  };

  const handleNavigateToTaskList = (projectId) => {
    sessionStorage.setItem(
      "selectedProject",
      JSON.stringify({
        id_projeto: projectId,
        id_lider: project.id_lider,
        nome_projeto: project.nome_projeto,
      })
    );
    navigate(`/lista-tarefas/${projectId}`);
  };

  const loggedInUserId = localStorage.getItem("idUsuario");
  const isUserProjectLeader = Number(loggedInUserId) === project.id_lider;

  const liderDoProjeto = Array.isArray(project.usuarios)
  ? project.usuarios.find(
      (usuario) => usuario.id_usuario === project.id_lider
    )
  : null;

  const imagemLiderSrc = handleImageProfile(liderDoProjeto?.foto_perfil);

  return (
    <div
      className="bg-white shadow-md rounded-md border border-gray-400 flex flex-col h-full cursor-pointer"
      onClick={() => handleNavigateToTaskList(project.id_projeto)}
    >
      <header className="border-b border-gray-300 flex justify-between items-center p-2">
        <h2 className="text-2xl text-amber-600">{project.nome_projeto}</h2>
        <img
          className="w-8 h-8 rounded-lg object-cover border border-gray-400"
          src={imagemLiderSrc}
          alt="Foto de perfil do líder do projeto"
        />
      </header>

      <main className="flex-1 flex flex-col gap-2">
        <div className="flex-1 flex items-center justify-center pt-1">
          <p className="font-semibold uppercase text-gray-800 text-3xl">
            {project.pontuacao_projeto == null
              ? "0"
              : project.pontuacao_projeto}{" "}
            pts
          </p>
        </div>

        <ul className="flex justify-end p-2">
          {Array.isArray(project.usuarios) &&
            project.usuarios.map((usuario) => {
              const imagemSrc = handleImageProfile(usuario.foto_perfil);            

              return (
                <li key={usuario.id_usuario}>
                  <img
                    className="w-8 h-8 rounded-lg object-cover border border-gray-400"
                    src={imagemSrc}
                    alt="Foto de perfil do usuário"
                  />
                </li>
              );
            })}
        </ul>
      </main>

      <footer className="mt-auto">
        {isUserProjectLeader && (
          <div className="flex gap-5 border-t border-gray-300 p-2">
            <button
              className="border border-amber-600 text-gray-900 rounded-sm hover:bg-amber-600 hover:text-white cursor-pointer transition-all font-semibold p-2 w-full"
              onClick={openModal}
            >
              Editar
            </button>
            <button
              className="bg-red-800 rounded-sm hover:bg-red-950 text-white cursor-pointer transition-all font-semibold p-2 w-full"
              onClick={handleDelete}
            >
              Deletar
            </button>
          </div>
        )}
      </footer>

      <ModalEditarProjeto
        isOpen={isOpen}
        closeModal={closeModal}
        data={project}
        setProjects={setProjects}
      />
    </div>
  );
}

export default ProjetoCard;

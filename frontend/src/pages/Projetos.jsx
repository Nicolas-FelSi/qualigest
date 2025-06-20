import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ModalCriarProjeto from "../components/Modais/ModalCriarProjeto";
import getProjects from "../api/projects/getProjects";
import ProjetoCard from "../components/Projetos/ProjetoCard";
import Aside from "../components/Aside";
import getUsersByProject from "../api/getUsersByProject";

function Projetos() {
  const [isOpen, setIsOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const [error, setError] = useState(null); // Estado de erro

  const navigate = useNavigate();

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // 1. Busca a lista inicial de projetos
      const projectData = await getProjects();
      const initialProjects = Array.isArray(projectData?.projetos) ? projectData.projetos : [];

      if (initialProjects.length === 0) {
        setProjects([]);
        return; // Sai da função se não houver projetos
      }

      // 2. Cria um array de Promises, onde cada uma busca os usuários de um projeto
      const projectsWithUsersPromises = initialProjects.map(async (project) => {
        try {
          const users = await getUsersByProject(project.id_projeto);
          // Retorna o objeto do projeto original + a nova propriedade 'usuarios'
          return { ...project, usuarios: Array.isArray(users) ? users : [] };
        } catch (userError) {
          console.error(`Erro ao buscar usuários para o projeto ${project.id_projeto}:`, userError);
          // Retorna o projeto mesmo se a busca por usuários falhar, com um array vazio
          return { ...project, usuarios: [] };
        }
      });

      // 3. Usa Promise.all para esperar que TODAS as buscas de usuários terminem
      const projectsWithUsers = await Promise.all(projectsWithUsersPromises);

      // 4. Atualiza o estado com os projetos já enriquecidos com os usuários
      setProjects(projectsWithUsers);

    } catch (err) {
      console.error("Erro ao buscar projetos:", err);
      setError(err.message || "Falha ao buscar projetos.");
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("isLoggedIn")) {
      navigate("/");
    } else {
      fetchProjects();
    }
  }, [navigate, fetchProjects]);

  return (
    <>
      <div className="flex gap-2 lg:gap-4 min-h-screen">
        <Aside />
        <main className="w-full mr-2 lg:mr-4 flex flex-col">
          <div className="p-3 bg-white shadow-sm rounded-lg mb-2 lg:mb-4">
            <h2 className="text-2xl font-medium uppercase">Projetos</h2>
          </div>
          {/* Container para o conteúdo dinâmico (loading, error, projects list) */}
          <div className="flex-grow flex flex-col">
            {loading && (
              <div className="flex-grow flex items-center justify-center">
                <p className="text-center text-lg text-gray-600">
                  Carregando projetos...
                </p>
              </div>
            )}
            {error && (
              <div className="flex-grow flex items-center justify-center">
                <p className="text-center text-lg text-red-600">
                  Erro: {error}
                </p>
              </div>
            )}

            {!loading && !error && (
              <>
                {/* O grid só é renderizado se não estiver carregando e não houver erro */}
                {/* A mensagem de "nenhum projeto" (sem busca) é tratada pelo fato de o grid ficar vazio + card de adicionar */}
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                  {projects.map((project) => (
                    <ProjetoCard
                      key={project.id_projeto}
                      project={project}
                      setProjects={setProjects}
                      refreshProjects={fetchProjects}
                    />
                  ))}
                  {/* Card para adicionar novo projeto - sempre visível se não estiver carregando ou com erro */}
                  {/* Se não houver projetos e a busca estiver vazia, este será o único card "ativo" */}
                  <div className="bg-white shadow-md rounded-lg flex flex-col justify-center items-center p-4 min-h-[200px] hover:shadow-lg transition-shadow">
                    <button
                      className="bg-gray-200 w-24 h-24 sm:w-32 sm:h-32 rounded-full flex items-center justify-center text-5xl sm:text-6xl text-gray-500 cursor-pointer hover:bg-gray-300 hover:text-gray-600 transition-all focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                      onClick={openModal}
                      aria-label="Criar novo projeto"
                    >
                      +
                    </button>
                    <p className="mt-3 text-sm text-gray-600 font-medium">
                      Novo Projeto
                    </p>
                  </div>
                </section>
                {projects.length === 0 && !loading && !error && (
                  <div className="flex-grow flex items-center justify-center">
                    <p className="text-center text-lg text-gray-500 mt-4">
                      Você ainda não tem projetos.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </main>

        <ModalCriarProjeto
          isOpen={isOpen}
          closeModal={closeModal}
          setProjects={setProjects}
        />
      </div>
    </>
  );
}

export default Projetos;

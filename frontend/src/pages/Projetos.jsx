import { useEffect, useState } from "react";
import Aside from "../components/Aside";
import { MdSearch } from "react-icons/md";
import ModalCriarProjeto from "../components/ModalCriarProjeto";
import { useNavigate } from "react-router-dom";
import URL_BASE from "../urlBase";
import ProjetoCard from "../components/ProjetoCard";

function Projetos() {
  const [isOpen, setIsOpen] = useState(false);
  const [projects, setProjects] = useState([]);

  const urlBase = URL_BASE;
  const port = import.meta.env.VITE_PORT_BACKEND || 8080;
  const navigate = useNavigate();

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  useEffect(() => {
    async function getProjects() {
      try {
        const response = await fetch(
          `http://localhost${port != 80 ? `:${port}` : ""}${urlBase}/exibirProjeto.php`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
  
        const data = await response.json();
  
        setProjects(data.projetos);
      } catch (error) {
        console.error("Erro ao pegar projetos:", error);
      }
    }
    getProjects();
  }, [port, urlBase]);

  useEffect(() => {
    if (!localStorage.getItem("isLoggedIn")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="flex gap-1 lg:gap-3">
      <Aside />
      <main className="w-full">
        <form className="px-2 py-2 bg-white flex flex-col gap-2 md:flex-row justify-between shadow-sm">
          <div className="flex w-full">
            <input
              type="text"
              id="pesquisa_projetos"
              className="rounded-s-lg bg-gray-50 border text-gray-900 w-full text-sm border-gray-300 p-2.5"
              placeholder="Pesquisar projetos"
              name="pesquisa_projetos"
            />
            <button
              type="submit"
              className="inline-flex items-center px-6 text-white text-2xl bg-gray-950 border border-gray-950 rounded-e-md"
            >
              <MdSearch />
            </button>
          </div>
        </form>
        <section className="mt-3 grid grid-cols-2 lg:grid-cols-4 gap-3">
          { 
            projects.map(project => (
              <ProjetoCard key={project.id_projeto} project={project}/>
            ))
          }
          <div className="bg-white shadow-sm flex justify-center items-center">
            <div 
              className="bg-gray-300 w-40 h-40 rounded-full flex items-center justify-center text-6xl cursor-pointer hover:scale-105 transition-all"
              onClick={openModal}
            >
              +
            </div>
          </div>
        </section>
      </main>

      <ModalCriarProjeto isOpen={isOpen} closeModal={closeModal} />
    </div>
  );
}

export default Projetos;

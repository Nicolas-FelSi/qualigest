import { useEffect, useState } from "react";
import { MdSearch } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import ModalCriarProjeto from "../components/Modais/ModalCriarProjeto";
import getProjects from "../api/projects/getProjects";
import ProjetoCard from "../components/Projetos/ProjetoCard";
import Aside from "../components/Aside";

function Projetos() {
  const [isOpen, setIsOpen] = useState(false);
  const [projects, setProjects] = useState([]);

  const navigate = useNavigate();

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  useEffect(() => {
    const handleGetProjects = async () => { 
      const data = await getProjects();
      setProjects(data.projetos)
    }
    handleGetProjects();
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("isLoggedIn")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="flex gap-1 lg:gap-3">
      <Aside />
      <main className="w-full">
        <form className="px-2 py-2 bg-white flex flex-col gap-2 md:flex-row justify-between shadow-md">
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
        <section className="mt-1 lg:mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          { 
            projects.map(project => (
              <ProjetoCard key={project.id_projeto} project={project} setProjects={setProjects}/>
            ))
          }
          <div className="bg-white shadow-md flex justify-center items-center p-4">
            <div 
              className="bg-gray-300 w-40 h-40 rounded-full flex items-center justify-center text-6xl cursor-pointer hover:scale-105 transition-all"
              onClick={openModal}
            >
              +
            </div>
          </div>
        </section>
      </main>

      <ModalCriarProjeto isOpen={isOpen} closeModal={closeModal} setProjects={setProjects}/>
    </div>
  );
}

export default Projetos;

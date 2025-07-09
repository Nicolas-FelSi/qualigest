import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import {
  MdLayers,      
  MdPerson,      
  MdExitToApp,   
  MdFolderOpen,  
  MdCheckCircle, 
  MdInfo,        
  MdHome
} from "react-icons/md";

const NavItem = ({ to, icon, children, isSubItem = false }) => {
  const baseClasses = "flex items-center gap-3 p-3 w-full transition-colors duration-200";
  const textClasses = "hidden lg:block font-medium";
  const activeClasses = "shadow-inner border-l-4 border-l-amber-600 bg-gray-600 text-amber-500";
  const inactiveClasses = "text-gray-300 hover:bg-gray-600 hover:text-white";
  const subItemClasses = isSubItem ? "pl-8" : ""; // Adiciona recuo para sub-itens

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${baseClasses} ${subItemClasses} ${isActive ? activeClasses : inactiveClasses}`
      }
    >
      {icon}
      <span className={textClasses}>{children}</span>
    </NavLink>
  );
};

function Aside() {
  const { idProjeto } = useParams(); // Pega o ID da URL, se existir
  const [selectedProject, setSelectedProject] = useState(null);

  // Este useEffect monitora a URL e o sessionStorage para manter o Aside atualizado
  useEffect(() => {
    const projectDataString = sessionStorage.getItem("selectedProject");
    if (projectDataString) {
      const projectData = JSON.parse(projectDataString);
      // Garante que o projeto no storage corresponde ao da URL
      if (projectData.id_projeto == idProjeto) {
        setSelectedProject(projectData);
      } else {
        setSelectedProject(null); // Limpa se o usuário navegar para fora de um projeto
      }
    } else {
      setSelectedProject(null);
    }
  }, [idProjeto]); // Roda sempre que o idProjeto na URL mudar

  function logout() {
    localStorage.clear();
    sessionStorage.clear();
  }

  return (
    <aside className="w-16 lg:w-60 bg-gray-700 h-screen flex flex-col shadow-lg">
      <div className="text-center p-3 w-full border-b-gray-600 border-b">
        <NavLink to="/" className="flex items-center justify-center lg:justify-start gap-2">
          <MdHome size={32} className="text-amber-500 flex-shrink-0" />
          <h1 className="text-amber-500 font-bold text-2xl hidden lg:block">
            QualiGest
          </h1>
        </NavLink>
      </div>

      <nav className="flex-grow">
        {/* -- NAVEGAÇÃO PRINCIPAL -- */}
        <ul>
          <li>
            <NavItem to="/projetos" icon={<MdLayers size={24} />}>
              Projetos
            </NavItem>
          </li>
          <li>
            <NavItem to="/perfil" icon={<MdPerson size={24} />}>
              Meu Perfil
            </NavItem>
          </li>
        </ul>

        {/* -- NAVEGAÇÃO CONTEXTUAL DE PROJETO -- */}
        {selectedProject && (
          <div className="mt-4 pt-4 border-t border-gray-600">
            {/* Título do Projeto Ativo */}
            <div className="p-3 flex items-center gap-3 text-gray-400">
              <MdFolderOpen size={24} />
              <span className="hidden lg:block font-semibold truncate">
                {selectedProject.nome_projeto}
              </span>
            </div>
            {/* Sub-itens do Projeto */}
            <ul>
              <li>
                <NavItem to={`/lista-tarefas/${selectedProject.id_projeto}`} icon={<MdCheckCircle size={24} />} isSubItem={true}>
                  Tarefas
                </NavItem>
              </li>
              <li>
                <NavItem to={`/detalhes-projeto/${selectedProject.id_projeto}`} icon={<MdInfo size={24} />} isSubItem={true}>
                  Detalhes
                </NavItem>
              </li>
            </ul>
          </div>
        )}
      </nav>

      {/* -- BOTÃO DE SAIR -- */}
      <div className="p-2 border-t border-gray-600">
        <NavLink to="/" onClick={logout} className="flex items-center gap-3 p-3 w-full text-gray-300 hover:bg-red-900 hover:text-white rounded-md transition-colors duration-200">
          <MdExitToApp size={24} />
          <span className="hidden lg:block font-medium">Sair</span>
        </NavLink>
      </div>
    </aside>
  );
}

export default Aside;
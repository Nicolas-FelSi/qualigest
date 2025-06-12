import { NavLink, useLocation, useParams } from "react-router-dom";
import {
  MdCheckCircle,
  MdExitToApp,
  MdInfo,
  MdLayers,
  MdMenu,
  MdPersonPin,
} from "react-icons/md";

function Aside() {
  const urlPath = useLocation();
  const params = useParams();

  // 1. Busque o último ID do sessionStorage
  const lastProjectId = sessionStorage.getItem("lastProjectId");

  // 2. Determine o ID a ser usado: priorize o da URL, senão use o do storage
  const currentProjectId = params.projectId || lastProjectId;

  function logout() {
    localStorage.clear();
    sessionStorage.clear();
  }

  return (
    <>
      <aside className="w-12 md:w-64 bg-gray-700 h-full shadow-md">
        <nav>
          <ul className="flex flex-col justify-between p-0 h-screen">
            <div>
              <li className="text-center p-4 w-full border-b-gray-500 border-b">
                <NavLink to="/">
                  <h1 className="text-amber-600 font-medium text-3xl hidden md:block">
                    QualiGest
                  </h1>
                </NavLink>
              </li>
              <NavLink
                to="/projetos"
                className={`flex items-center md:gap-3 p-3 w-full border-b-gray-500 border-b ${
                  urlPath.pathname == "/projetos"
                    ? "shadow-md border-l-4 border-l-amber-600 bg-gray-600 text-amber-500"
                    : "text-white"
                }`}
              >
                <MdLayers
                  className={`${
                    urlPath.pathname === `/projetos`
                      ? "text-amber-500"
                      : "text-white"
                  }  text-xl`}
                />
                <span className="hidden md:block font-medium">Projetos</span>
              </NavLink>
              {currentProjectId && ( // Só mostra se tivermos algum ID
                <>
                  <NavLink
                    to={`/lista-tarefas/${currentProjectId}`}
                    className={`flex items-center md:gap-3 p-3 w-full border-b-gray-500 border-b ${
                      urlPath.pathname ===
                      `/lista-tarefas/${currentProjectId}`
                        ? "shadow-md border-l-4 border-l-amber-600 bg-gray-600 text-amber-500"
                        : "text-white"
                    }`}
                  >
                    <MdCheckCircle
                      className={`${
                        urlPath.pathname ===
                        `/lista-tarefas/${currentProjectId}`
                          ? "text-amber-500"
                          : "text-white"
                      }  text-xl`}
                    />
                    <span className="hidden md:block font-medium">Tarefas</span>
                  </NavLink>
                  <NavLink
                    to={`/detalhes-projeto/${currentProjectId}`}
                    className={`flex items-center md:gap-3 p-3 w-full border-b-gray-500 border-b ${
                      urlPath.pathname ===
                      `/detalhes-projeto/${currentProjectId}`
                        ? "shadow-md border-l-4 border-l-amber-600 bg-gray-600 text-amber-500"
                        : "text-white"
                    }`}
                  >
                    <MdInfo
                      className={`${
                        urlPath.pathname ===
                        `/detalhes-projeto/${currentProjectId}`
                          ? "text-amber-500"
                          : "text-white"
                      }  text-xl`}
                    />
                    <span className="hidden md:block font-medium">
                      Detalhes do projeto
                    </span>
                  </NavLink>
                </>
              )}
              <NavLink
                to="/perfil"
                className={`flex items-center md:gap-3 p-3 w-full border-b-gray-500 border-b ${
                  urlPath.pathname == "/perfil"
                    ? "shadow-md border-l-4 border-l-amber-600 bg-gray-600 text-amber-500"
                    : "text-white"
                }`}
              >
                <MdPersonPin
                  className={`${
                    urlPath.pathname === `/perfil`
                      ? "text-amber-500"
                      : "text-white"
                  }  text-xl`}
                />
                <span className="hidden md:block font-medium">Perfil</span>
              </NavLink>
            </div>
            <NavLink
              to="/"
              className="flex items-center md:gap-3 p-2 w-full border-t-gray-500 text-white border-t"
              onClick={logout}
            >
              <MdExitToApp className="text-white text-xl" />
              <span className="hidden md:block font-medium">Sair</span>
            </NavLink>
          </ul>
        </nav>
      </aside>
    </>
  );
}

export default Aside;

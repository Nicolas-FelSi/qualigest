import { NavLink, useLocation, useParams } from "react-router-dom";
import { MdCheckCircle, MdExitToApp, MdInfo, MdLayers, MdMenu, MdPersonPin } from "react-icons/md"

function Aside() {
  const urlPath = useLocation();
  const params = useParams();

  function logout() {
    localStorage.clear();
  }

  return (
    <>
      <aside
        className="w-12 md:w-60 bg-white h-full shadow-md"
      >
        <nav>
          <ul className="flex flex-col justify-between p-0 h-screen">
            <div>
              <li className="flex items-center md:gap-3 p-4 w-full border-b-gray-200 border-b">
                <MdMenu className="text-amber-600 text-3xl" />
                <NavLink to="/">
                  <h1 className="text-amber-600 font-medium text-2xl hidden md:block">QualiGest</h1>
                </NavLink>
              </li>
              <NavLink
                to="/projetos"
                className={`flex items-center md:gap-3 p-3 w-full border-b-gray-200 border-b ${urlPath.pathname == "/projetos" && "shadow-md border-l-4 border-l-amber-600"}`}
              >
                <MdLayers className="text-amber-600 text-2xl" />
                <span className="hidden md:block">Projetos</span>
              </NavLink>
              { urlPath.pathname != "/projetos" &&
                <NavLink
                  to={`/lista-tarefas/${params.idProjeto}`}
                  className={`flex items-center md:gap-3 p-3 w-full border-b-gray-200 border-b ${urlPath.pathname == `/lista-tarefas/${params.idProjeto}` && "shadow-md border-l-4 border-l-amber-600"}`}
                >
                  <MdCheckCircle className="text-amber-600 text-xl" />
                  <span className="hidden md:block">Tarefas</span>
                </NavLink>
              }
              { urlPath.pathname != "/projetos" &&
                <NavLink
                  to="/detalhes-projeto"
                  className={`flex items-center md:gap-3 p-3 w-full border-b-gray-200 border-b ${urlPath.pathname == "/detalhes-projeto" && "shadow-md border-l-4 border-l-amber-600"}`}
                >
                  <MdInfo className="text-amber-600 text-xl" />
                  <span className="hidden md:block">Detalhes do projeto</span>
                </NavLink>
              }
              <NavLink
                to="/perfil"
                className={`flex items-center md:gap-3 p-3 w-full border-b-gray-200 border-b ${urlPath.pathname == "/perfil" && "shadow-md border-l-4 border-l-amber-600"}`}
              >
                <MdPersonPin className="text-amber-600 text-xl" />
                <span className="hidden md:block">Perfil</span>
              </NavLink>
            </div>
            <NavLink to="/" className="flex items-center md:gap-3 p-2 w-full border-t-gray-200 border-t" onClick={logout}>
              <MdExitToApp className="text-amber-600 text-xl" />
              <span className="hidden md:block">Sair</span>
            </NavLink>
          </ul>
        </nav>
      </aside>
    </>
  );
}

export default Aside;

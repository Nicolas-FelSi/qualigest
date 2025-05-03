import { NavLink, useLocation } from "react-router-dom";
import styles from "./Aside.module.css";

function Aside() {
  const urlPath = useLocation();

  return (
    <>
      <aside
        className={`${styles.aside} bg-white h-100 shadow-sm`}
      >
        <nav>
          <ul className="d-flex flex-column justify-content-between p-0 vh-100">
            <div>
              <li className="d-flex align-items-center gap-md-3 p-2 w-100 text-decoration-none text-black border-bottom">
                <i className={`${styles.icones} bi bi-list fs-2`}></i>
                <NavLink to="/" className="text-decoration-none">
                  <h1 className={`${styles.h1} fs-4 d-none d-md-block`}>QualiGest</h1>
                </NavLink>
              </li>
              <NavLink
                to="/projetos"
                className={`d-flex align-items-center gap-md-3 p-2 w-100 text-decoration-none text-black border-bottom ${urlPath.pathname == "/projetos" && styles["li-ativo"]}`}
              >
                <i className={`${styles.icones} bi bi-stack`}></i>
                <span className="d-none d-md-block">Projetos</span>
              </NavLink>
              { urlPath.pathname != "/projetos" &&
                <NavLink
                  to="/lista-tarefas"
                  className={`d-flex align-items-center gap-md-3 p-2 w-100 text-decoration-none text-black border-bottom ${urlPath.pathname == "/lista-tarefas" && styles["li-ativo"]}`}
                >
                  <i className={`${styles.icones} bi bi-check-circle-fill`}></i>
                  <span className="d-none d-md-block">Tarefas</span>
                </NavLink>
              }
              { urlPath.pathname != "/projetos" &&
                <NavLink
                  to="/detalhes-projeto"
                  className={`d-flex align-items-center gap-md-3 p-2 w-100 text-decoration-none text-black border-bottom ${urlPath.pathname == "/detalhes-projeto" && styles["li-ativo"]}`}
                >
                  <i className={`${styles.icones} bi bi-info-circle-fill`}></i>
                  <span className="d-none d-md-block">Detalhes do projeto</span>
                </NavLink>
              }
              <NavLink
                to="/perfil"
                className={`d-flex align-items-center gap-md-3 p-2 w-100 text-decoration-none text-black border-bottom ${urlPath.pathname == "/perfil" && styles["li-ativo"]}`}
              >
                <i className={`${styles.icones} bi bi-person-circle`}></i>
                <span className="d-none d-md-block">Perfil</span>
              </NavLink>
            </div>
            <NavLink to="/" className="d-flex align-items-center gap-md-3 p-2 w-100 text-decoration-none text-black border-top">
              <i className={`${styles.icones} bi bi-box-arrow-right`}></i>
              <span className="d-none d-md-block">Sair</span>
            </NavLink>
          </ul>
        </nav>
      </aside>
    </>
  );
}

export default Aside;

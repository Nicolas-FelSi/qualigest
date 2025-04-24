import { NavLink, useLocation } from "react-router-dom";
import styles from "./Aside.module.css";

function Aside() {
  const urlPath = useLocation();

  return (
    <>
      <aside
        className={`${styles.aside} bg-white w-auto d-lg-inline-block h-100 d-none shadow-sm`}
      >
        <nav>
          <ul className="d-flex flex-column justify-content-between m-0 p-0 vh-100">
            <div>
              <li className={`${styles["li-border"]}`}>
                <i className={`${styles.icones} bi bi-list fs-2`}></i>
                <NavLink to="/" className="text-decoration-none">
                  <h1 className={`${styles.h1} fs-4 m-0`}>QualiGest</h1>
                </NavLink>
              </li>
              <NavLink
                to="/projetos"
                className={`${styles["li-border"]} ${urlPath.pathname == "/projetos" && styles["li-ativo"]}`}
              >
                <i className={`${styles.icones} bi bi-stack`}></i>
                <span>Projetos</span>
              </NavLink>
              <NavLink
                to="/lista-tarefas"
                className={`${styles["li-border"]} ${urlPath.pathname == "/lista-tarefas" && styles["li-ativo"]}`}
              >
                <i className={`${styles.icones} bi bi-check-circle-fill`}></i>
                <span>Tarefas</span>
              </NavLink>
              <NavLink
                to="/detalhes-projeto"
                className={`${styles["li-border"]} ${urlPath.pathname == "/detalhes-projeto" && styles["li-ativo"]}`}
              >
                <i className={`${styles.icones} bi bi-info-circle-fill`}></i>
                <span>Detalhes do projeto</span>
              </NavLink>
              <NavLink
                to="/perfil"
                className={`${styles["li-border"]} ${urlPath.pathname == "/perfil" && styles["li-ativo"]}`}
              >
                <i className={`${styles.icones} bi bi-person-circle`}></i>
                <span>Perfil</span>
              </NavLink>
            </div>
            <NavLink to="/" className={styles["li-border-logout"]}>
              <i className={`${styles.icones} bi bi-box-arrow-right`}></i>
              <span>Sair</span>
            </NavLink>
          </ul>
        </nav>
      </aside>

      <aside className="bg-white w-auto d-lg-none h-100">
        <nav>
          <ul className="d-flex flex-column justify-content-between">
            <div>
              <li className="li-border">
                <button
                  className={`${styles.icones} bi bi-list fs-2 border-0 bg-transparent`}
                  data-bs-toggle="offcanvas"
                  data-bs-target="#menuAside"
                  aria-controls="menuAside"
                ></button>
              </li>
              <NavLink
                to="/projetos"
                className="li-border justify-content-center"
              >
                <i className={`${styles.icones} bi bi-stack`}></i>
              </NavLink>
              <NavLink
                to="/lista-tarefas"
                className="li-border justify-content-center"
              >
                <i className={`${styles.icones} bi bi-check-circle-fill`}></i>
              </NavLink>
              <NavLink
                to="/detalhes-projeto"
                className="li-border justify-content-center"
              >
                <i className={`${styles.icones} bi bi-info-circle-fill`}></i>
              </NavLink>
              <NavLink
                to="/perfil"
                className="li-border justify-content-center"
              >
                <i className={`${styles.icones} bi bi-person-circle`}></i>
              </NavLink>
            </div>
            <NavLink to="/" className="li-border-logout justify-content-center">
              <i className={`${styles.icones} bi bi-box-arrow-right`}></i>
            </NavLink>
          </ul>
        </nav>
      </aside>
    </>
  );
}

export default Aside;

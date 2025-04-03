function Aside() {
  return (
    <>
      {/* <aside className="bg-white w-auto d-lg-inline-block h-100 d-none">
        <nav>
          <ul className="d-flex flex-column justify-content-between">
            <div>
              <li className="li-border">
                <i className="bi bi-list fs-2"></i>
                <router-link to="/" className="text-decoration-none">
                  <h1>QualiGest</h1>
                </router-link>
              </li>
              <router-Link to="/projetos" className="li-border" :className="{ 'li-ativo': $route.path == '/projetos' }">
                <i className="bi bi-stack"></i>
                <span>Projetos</span>
              </router-Link>
              <router-Link to="/lista-tarefas" className="li-border" :className="{ 'li-ativo': $route.path == '/lista-tarefas' }">
                <i className="bi bi-check-circle-fill"></i>
                <span>Tarefas</span>
              </router-Link>
              <router-Link to="/detalhes-projeto" className="li-border" :className="{ 'li-ativo': $route.path == '/detalhes-projeto' }">
                <i className="bi bi-info-circle-fill"></i>
                <span>Detalhes do projeto</span>
              </router-Link>
              <router-Link to="/perfil" className="li-border" :className="{ 'li-ativo': $route.path == '/perfil' }">
                <i className="bi bi-person-circle"></i>
                <span>Perfil</span>
              </router-Link>
            </div>
            <router-Link to="/" className="li-border-logout">
              <i className="bi bi-box-arrow-right"></i>
              <span>Sair</span>
            </router-Link>
          </ul>
        </nav>
      </aside>

      <aside className="bg-white w-auto d-lg-none h-100">
        <nav>
          <ul className="d-flex flex-column justify-content-between">
            <div>
              <li className="li-border">
                <button className="bi bi-list fs-2 border-0 bg-transparent" data-bs-toggle="offcanvas" data-bs-target="#menuAside" aria-controls="menuAside"></button>
              </li>
              <router-Link to="/projetos" className="li-border justify-content-center" :className="{ 'li-ativo': $route.path == '/projetos' }">
                <i className="bi bi-stack"></i>
              </router-Link>
              <router-Link to="/lista-tarefas" className="li-border justify-content-center" :className="{ 'li-ativo': $route.path == '/lista-tarefas' }">
                <i className="bi bi-check-circle-fill"></i>
              </router-Link>
              <router-Link to="/detalhes-projeto" className="li-border justify-content-center" :className="{ 'li-ativo': $route.path == '/detalhes-projeto' }">
                <i className="bi bi-info-circle-fill"></i>
              </router-Link>
              <router-Link to="/perfil" className="li-border justify-content-center" :className="{ 'li-ativo': $route.path == '/perfil' }">
                <i className="bi bi-person-circle"></i>
              </router-Link>
            </div>
            <router-Link to="/" className="li-border-logout justify-content-center">
              <i className="bi bi-box-arrow-right"></i>
            </router-Link>
          </ul>
        </nav>
      </aside> */}
    </>
  )
}

export default Aside;

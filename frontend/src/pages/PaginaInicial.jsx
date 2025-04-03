import '../assets/PaginaInicial.css'

function PaginaInicial() {
  return (
    <>
     <header className="bg-white d-flex justify-content-between align-items-center py-2 px-3">
        <h1>Qualigest</h1>
        <nav className="d-sm-flex d-none gap-4">
          <button className="rounded-1 border-0" data-bs-toggle="modal" data-bs-target="#loginModal">
            Entrar
          </button>
          <button className="rounded-1 border-0" data-bs-toggle="modal" data-bs-target="#cadastroModal">
            Cadastrar
          </button>
        </nav>
        <button type="button" className="border-0 bg-transparent d-sm-none" data-bs-toggle="offcanvas" data-bs-target="#menuPaginaInicial" aria-controls="menuPaginaInicial">
          <i className="bi bi-list fs-1 btn-menu"></i>
        </button>
      </header>
      <main className="d-flex align-items-center flex-column pb-3 p-2">
        <h2 className="py-3">Bem-vindo ao QualiGest</h2>
        <p className="fw-bold">Gerencie suas tarefas com eficiência e colaboração</p>
        <div className="py-5">
          <img src="/equipe-tarefa.png" alt="" />
        </div>
        <div className="d-flex gap-3 flex-wrap justify-content-center">
          <div className="bg-white p-4 rounded-1 d-flex flex-column gap-2">
            <img src="/tarefas.webp" alt="" />
            <h2 className="fs-5">Priorização de tarefas</h2>
            <p>Organize suas tarefas de acordo com a prioridade e prazo</p>
          </div>
          <div className="bg-white p-4 rounded-1 d-flex flex-column gap-2">
            <img src="/prazo.png" alt="" />
            <h2 className="fs-5">Gerenciamento de Prazos</h2>
            <p>Acompanhe os prazos de cada projeto com facilidade</p>
          </div>
          <div className="bg-white p-4 rounded-1 d-flex flex-column gap-2">
            <img src="/equipe.png" alt="" />
            <h2 className="fs-5">Colaboração em Equipe</h2>
            <p>Trabalhe em conjunto atribuindo responsabilidades</p>
          </div>
        </div>
      </main>

      {/* Menu */}
      <div className="offcanvas offcanvas-start" tabIndex="-1" id="menuPaginaInicial" aria-labelledby="menuPaginaInicialLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="menuPaginaInicialLabel">QualiGest</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body p-0">
          <nav className="d-flex gap-4 flex-column text-center w-100">
            <a className="rounded-1 border-0 text-decoration-none border-bottom w-100" data-bs-toggle="modal" data-bs-target="#loginModal">
              Entrar
            </a>
            <a className="rounded-1 border-0 text-decoration-none border-bottom w-100" data-bs-toggle="modal" data-bs-target="#cadastroModal">
              Cadastrar
            </a>
          </nav>
        </div>
      </div>

      {/* Modal Login */}
      <div className="modal fade" id="loginModal" tabIndex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title fs-5" id="loginModalLabel">Login</h2>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="input-group mb-3">
                  <span className="input-group-text">@</span>
                  <div className="form-floating">
                    <input type="email" className="form-control" id="inputEmail" placeholder="" />
                    <label htmlFor="inputEmail">E-mail</label>
                  </div>
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="bi bi-key"></i>
                  </span>
                  <div className="form-floating">
                    <input type="password" className="form-control" id="inputSenha" placeholder="" />
                    <label htmlFor="inputSenha">Senha</label>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer justify-content-center">
              <button type="button" className="btn btn-dark w-100" data-bs-dismiss="modal">
                Entrar
              </button>
              <p>
                Não tem uma conta?
                <span role="button" data-bs-toggle="modal" data-bs-target="#cadastroModal"
                  className="text-decoration-underline text-primary fw-semibold">Cadastre-se</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Cadastro */}
      <div className="modal fade" id="cadastroModal" tabIndex="-1" aria-labelledby="cadastroModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title fs-5" id="cadastroModalLabel">Cadastro</h2>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="input-group mb-3">
                  <div className="form-floating">
                    <input type="text" className="form-control" id="inputNomeCompleto" placeholder="" />
                    <label htmlFor="inputNomeCompleto">Nome completo</label>
                  </div>
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="bi bi-person-circle"></i>
                  </span>
                  <div className="form-floating">
                    <input type="text" className="form-control" id="inputNomeUsuario" placeholder="" />
                    <label htmlFor="inputNomeUsuario">Nome de usuário</label>
                  </div>
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">@</span>
                  <div className="form-floating">
                    <input type="email" className="form-control" id="inputEmail" placeholder="" />
                    <label htmlFor="inputEmail">E-mail</label>
                  </div>
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="bi bi-key"></i>
                  </span>
                  <div className="form-floating">
                    <input type="password" className="form-control" id="inputSenha" placeholder="" />
                    <label htmlFor="inputSenha">Senha</label>
                  </div>
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="bi bi-key"></i>
                  </span>
                  <div className="form-floating">
                    <input type="password" className="form-control" id="inputConfirmarSenha" placeholder="" />
                    <label htmlFor="inputConfirmarSenha">Confirme sua senha</label>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer justify-content-center">
              <button type="button" className="btn btn-dark w-100" data-bs-dismiss="modal">
                Cadastrar
              </button>
              <p>
                Já possui uma conta?
                <span role="button" data-bs-toggle="modal" data-bs-target="#loginModal"
                  className="text-decoration-underline text-primary fw-semibold">Fazer login</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PaginaInicial;


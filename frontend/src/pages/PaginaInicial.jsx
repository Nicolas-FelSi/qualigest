function PaginaInicial() {
  return (
    <>
      <header className="bg-white flex justify-between py-4 px-3 shadow-lg">
        <h1 className="text-3xl  sm:text-4xl font-semibold text-orange-400">Qualigest</h1>
        <nav className="hidden sm:flex gap-8">
          <button className="bg-blue-200 px-7 rounded-sm cursor-pointer font-semibold hover:bg-blue-900 hover:text-white transition-all" data-modal-target="modalLogin" data-modal-toggle="modalLogin">
            Entrar
          </button>
          <button className="bg-blue-200 px-7 rounded-sm cursor-pointer font-semibold hover:bg-blue-900 hover:text-white transition-all" data-modal-target="modalCadastro" data-modal-toggle="modalCadastro">
            Cadastrar
          </button>
        </nav>
        <button className="sm:hidden cursor-pointer">
          <svg className="w-8 h-8 text-orange-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M5 7h14M5 12h14M5 17h14"/>
          </svg>
        </button>
      </header>
      <main className="p-3 flex flex-col items-center">
        <h2 className="text-center text-orange-400 text-2xl md:text-3xl py-4 font-semibold">Bem-vindo ao QualiGest</h2>
        <p className="text-center md:text-lg">Gerencie suas tarefas com eficiência e colaboração</p>
        <div className="py-10 flex justify-center">
          <img src="/equipe-tarefa.png" alt="" />
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="bg-white p-6 shadow-md rounded-sm max-w-lg">
            <img className="w-40 max-w-full object-cover" src="/tarefas.webp" alt="" />
            <h2 className="font-semibold text-xl mb-3 mt-1 text-gray-800">Priorização de tarefas</h2>
            <p>Organize suas tarefas de acordo com a prioridade e prazo</p>
          </div>
          <div className="bg-white p-6 shadow-md rounded-sm max-w-lg">
            <img className="w-30 max-w-full object-cover" src="/prazo.png" alt="" />
            <h2 className="font-semibold text-xl mb-3 mt-1 text-gray-800">Gerenciamento de Prazos</h2>
            <p>Acompanhe os prazos de cada projeto com facilidade</p>
          </div>
          <div className="bg-white p-6 shadow-md rounded-sm max-w-lg">
            <img className="w-40 max-w-full object-cover" src="/equipe.png" alt="" />
            <h2 className="font-semibold text-xl mb-3 mt-1 text-gray-800">Colaboração em Equipe</h2>
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
     <div id="modalLogin" tabIndex="-1" aria-hidden="true" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div className="relative p-4 w-full max-w-xl max-h-full">
             {/* Modal content */}
            <div className="relative bg-white rounded-lg shadow-sm">
                 {/* Modal header */}
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
                    <h3 className="text-xl font-semibold text-orange-400">
                        Login
                    </h3>
                    <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-hide="modalLogin">
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
                 {/* Modal body */}
                <div className="p-4 md:p-5 space-y-4">
                  <form>
                    <label htmlFor="website-admin" className="block mb-2 text-sm font-medium text-gray-900">E-mail</label>
                    <div className="flex mb-4">
                      <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md">
                        <svg className="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M2.038 5.61A2.01 2.01 0 0 0 2 6v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6c0-.12-.01-.238-.03-.352l-.866.65-7.89 6.032a2 2 0 0 1-2.429 0L2.884 6.288l-.846-.677Z"/>
                          <path d="M20.677 4.117A1.996 1.996 0 0 0 20 4H4c-.225 0-.44.037-.642.105l.758.607L12 10.742 19.9 4.7l.777-.583Z"/>
                        </svg>
                      </span>
                      <input type="email" id="website-admin" className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5" placeholder="email@exemplo.com"/>
                    </div>
                    <label htmlFor="website-admin" className="block mb-2 text-sm font-medium text-gray-900">Senha</label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md">
                        <svg class="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                          <path fill-rule="evenodd" d="M8 10V7a4 4 0 1 1 8 0v3h1a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h1Zm2-3a2 2 0 1 1 4 0v3h-4V7Zm2 6a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0v-3a1 1 0 0 1 1-1Z" clip-rule="evenodd"/>
                        </svg>
                      </span>
                      <input type="password" id="website-admin" className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5" placeholder="*********"/>
                    </div>
                  </form>
                </div>
                 {/* Modal footer */}
                <div className="flex flex-col gap-2 items-center p-4 md:p-5 border-t border-gray-200 rounded-b">
                    <button data-modal-hide="modalLogin" type="button" className="bg-neutral-800 hover:bg-neutral-700 cursor-pointer transition-all text-white py-2 px-4 rounded-sm w-full">Entrar</button>
                    <span>Não tem uma conta? <a href="" className="underline text-blue-600 font-semibold hover:text-blue-900">Cadastre-se</a></span>
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


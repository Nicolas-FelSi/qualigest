function ModalLogin() {
    return (
        <div
        className="modal fade"
        id="loginModal"
        tabIndex="-1"
        aria-labelledby="loginModalLabel"
      >
        <div className="modal-dialog modal-dialog-centered">
          <form className="modal-content" >
            <div className="modal-header">
              <h2 className="modal-title fs-5" id="loginModalLabel">
                Login
              </h2>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div>
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="bi bi-envelope-at-fill"></i>
                  </span>
                  <div className="form-floating">
                    <input
                      type="email"
                      className="form-control"
                      id="inputEmailLogin"
                      placeholder=""
                      required
                    />
                    <label htmlFor="inputEmailLogin">E-mail</label>
                  </div>
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="bi bi-key-fill"></i>
                  </span>
                  <div className="form-floating">
                    <input
                      type="password"
                      className="form-control"
                      id="inputSenhaLogin"
                      placeholder=""
                      required
                    />
                    <label htmlFor="inputSenhaLogin">Senha</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer justify-content-center">
              <button
                type="submit"
                className="btn btn-dark w-100"
                data-bs-dismiss=""
              >
                Entrar
              </button>
              <p>
                Não tem uma conta?
                <span
                  role="button"
                  data-bs-toggle="modal"
                  data-bs-target="#cadastroModal"
                  className="text-decoration-underline text-primary fw-semibold"
                >
                  {" "}Cadastre-se
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    )
}

export default ModalLogin;
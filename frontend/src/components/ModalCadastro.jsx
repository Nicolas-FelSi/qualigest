import { useState } from "react";
import { ToastContainer} from "react-toastify";
import URL_BASE from "../urlBase"

function ModalCadastro() {
  const urlBase = URL_BASE;
  const host = import.meta.env.VITE_HOST_BACKEND;
  const port = import.meta.env.VITE_PORT_BACKEND;

  const [formData, setFormData] = useState({
    nome_completo: "",
    nome_usuario: "",
    email: "",
    senha: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
        formData.nome_completo == "" ||
        formData.nome_usuario == "" ||
        formData.email == "" ||
        formData.senha == "" ||
        confirmPassword == ""
    ) {
      alert("Preencha todos os campos!");
      return;
    }

    if (!(formData.senha == confirmPassword)) {
      alert("Senhas diferentes!");
      return;
    }

    try {
      const response = await fetch(
        `${host}${port ? ":" : ""}${port}${urlBase}/cadastroUsuario.php`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (data.status === "sucesso") {
        setFormData({
          nome_completo: "",
          nome_usuario: "",
          email: "",
          senha: "",
        });

        setConfirmPassword("");
      }
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
    }
  };

  return (
    <div
      className="modal fade"
      id="cadastroModal"
      tabIndex="-1"
      aria-labelledby="cadastroModalLabel"
    >
      <div className="modal-dialog modal-dialog-centered">
        <form className="modal-content" onSubmit={handleSubmit}>
          <div className="modal-header">
            <h2 className="modal-title fs-5" id="cadastroModalLabel">
              Cadastro
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
              <div>
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="bi bi-person-fill"></i>
                  </span>
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="inputNomeCompleto"
                      name="nome_completo"
                      placeholder=""
                      onChange={handleChange}
                      value={formData.nome_completo}
                    />
                    <label htmlFor="inputNomeCompleto">Nome completo</label>
                  </div>
                </div>
              </div>
              <div>
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="bi bi-person-circle"></i>
                  </span>
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="inputNomeUsuario"
                      name="nome_usuario"
                      onChange={handleChange}
                      value={formData.nome_usuario}
                      placeholder=""
                    />
                    <label htmlFor="inputNomeUsuario">Nome de usuário</label>
                  </div>
                </div>
              </div>
              <div>
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="bi bi-envelope-at-fill"></i>
                  </span>
                  <div className="form-floating">
                    <input
                      type="email"
                      className="form-control"
                      id="inputEmailCadastro"
                      name="email"
                      onChange={handleChange}
                      value={formData.email}
                      placeholder=""
                    />
                    <label htmlFor="inputEmailCadastro">E-mail</label>
                  </div>
                </div>
              </div>
              <div>
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="bi bi-key-fill"></i>
                  </span>
                  <div className="form-floating">
                    <input
                      type="password"
                      className="form-control"
                      id="inputSenhaCadastro"
                      name="senha"
                      onChange={handleChange}
                      value={formData.senha}
                      placeholder=""
                    />
                    <label htmlFor="inputSenhaCadastro">Senha</label>
                  </div>
                </div>
              </div>
              <div>
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="bi bi-key-fill"></i>
                  </span>
                  <div className="form-floating">
                    <input
                      type="password"
                      className="form-control"
                      id="inputConfirmarSenha"
                      placeholder=""
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <label htmlFor="inputConfirmarSenha">
                      Confirme sua senha
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer justify-content-center">
            <button
              type="submit"
              className="btn btn-dark w-100"
            >
              Cadastrar
            </button>
            <p>
              Já possui uma conta?
              <span
                role="button"
                data-bs-toggle="modal"
                data-bs-target="#loginModal"
                className="text-decoration-underline text-primary fw-semibold"
              >
                {" "}
                Fazer login
              </span>
            </p>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default ModalCadastro;

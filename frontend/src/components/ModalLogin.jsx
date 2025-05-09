import { useState } from "react";
import { toast } from "react-toastify"
import { Modal } from "bootstrap"
import { useNavigate } from "react-router-dom"
import URL_BASE from "../urlBase";
import { toast, ToastContainer } from "react-toastify";

function ModalLogin() {
  const urlBase = URL_BASE;
  const navigate = useNavigate();
  const port = import.meta.env.VITE_PORT_BACKEND || 8080;

  const [formData, setFormData] = useState({
    login: "",
    senha: ""
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.login == "" || formData.senha == "") {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost${port != 80 ? `:${port}` : ""}${urlBase}/login.php`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (data.status == "erro") {
        const notify = () => toast.error(data.mensagem);
        notify();
      } else {
        const notify = () => toast.success(data.mensagem);
        notify(); 

        const modalElement = document.getElementById('loginModal');
        const modal = Modal.getInstance(modalElement);
        modal.hide();

        navigate("/projetos");
      }
    } catch (error) {
      console.error("Erro ao logar:", error);
    }
  }

  return (
    <div
      className="modal fade"
      id="loginModal"
      tabIndex="-1"
      aria-labelledby="loginModalLabel"
    >
      <div className="modal-dialog modal-dialog-centered">
        <form className="modal-content" onSubmit={handleSubmit}>
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
                    name="login"
                    value={formData.login}
                    onChange={handleChange}
                    placeholder=""
                    required
                  />
                  <label htmlFor="inputEmailLogin">Login (e-mail)</label>
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
                    name="senha"
                    value={formData.senha}
                    onChange={handleChange}
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

      <ToastContainer/>
    </div>
  )
}

export default ModalLogin;
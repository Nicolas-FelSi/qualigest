import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { MdEmail, MdKey } from "react-icons/md";
import handleLogin from "../../api/handleLogin.js"

function ModalLogin({ isOpen, closeModal, openModalCadastro }) {
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  });

  function validate() {
    const newErrors = {};

    if (formData.email == "") newErrors.email = "O email é obrigatório";
    if (formData.senha == "") newErrors.senha = "A senha é obrigatório";

    return newErrors;
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const validationErrors = validate(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const data = await handleLogin(formData);

    if (data.status == "erro") {
      const notify = () => toast.error(data.mensagem);
      notify();
    } else {
      localStorage.setItem("isLoggedIn", "true");
      const notify = () => toast.success(data.mensagem);
      notify();

      closeModal();

      navigate("/projetos");
    }
  };

  if (isOpen) {
    return (
      <div
        className="inset-0 bg-black/75 fixed flex items-center justify-center"
        onClick={() => {
          closeModal();
          setFormData({
            email: "",
            senha: ""
          });
          setErrors({})
        }}
      >
        <form
          className="bg-white p-5 rounded-lg z-50 w-lg mx-2"
          noValidate
          onSubmit={handleSubmit}
          onClick={(e) => e.stopPropagation()}
        >
          <h2
            className="text-xl text-gray-900 font-semibold"
            id="cadastroModalLabel"
          >
            Login
          </h2>
          <hr className="mx-[-1.3rem] opacity-15 mt-4" />
          <div>
            <div className="mt-4">
              <label
                htmlFor="inputEmailLogin"
                className="mb-2 text-sm font-medium"
              >
                E-mail
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md">
                  <MdEmail />
                </span>
                <input
                  type="email"
                  id="inputEmailLogin"
                  className={`rounded-e-lg bg-gray-50 border text-gray-900 w-full text-sm ${errors.email ? "border-red-400" : "border-gray-300"} p-2.5`}
                  placeholder="email@exemplo.com"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              {errors.email && <p className="py-1 px-3 bg-red-100 rounded-sm border border-red-500 mt-1 text-red-700">{errors.email}</p>}
            </div>
            <div className="mt-4">
              <label
                htmlFor="inputSenhaLogin"
                className="mb-2 text-sm font-medium"
              >
                Senha
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md">
                  <MdKey />
                </span>
                <input
                  type="password"
                  id="inputSenhaLogin"
                  className={`rounded-e-lg bg-gray-50 border text-gray-900 w-full text-sm ${errors.email ? "border-red-400" : "border-gray-300"} p-2.5`}
                  placeholder="**************"
                  name="senha"
                  value={formData.senha}
                  onChange={handleChange}
                />
              </div>
              {errors.senha && <p className="py-1 px-3 bg-red-100 rounded-sm border border-red-500 mt-1 text-red-700">{errors.senha}</p>}
            </div>
          </div>
          <hr className="mx-[-1.3rem] mt-5 opacity-15" />
          <div>
            <button
              type="submit"
              className="bg-black w-full rounded-sm mt-4 p-2 text-white cursor-pointer hover:bg-black/85 transition-all"
            >
              Entrar
            </button>
            <p className="text-center mt-2">
              Não tem uma conta?
              <span
                className="underline cursor-pointer hover:text-blue-900 text-blue-600 font-semibold"
                onClick={() => {
                  closeModal();
                  openModalCadastro();
                  setFormData({
                    email: "",
                    senha: ""
                  });
                  setErrors({})
                }}
              >
                {" "}
                Cadastre-se
              </span>
            </p>
          </div>
        </form>
      </div>
    );
  }
}

export default ModalLogin;

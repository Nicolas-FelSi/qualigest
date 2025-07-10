import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdEmail, MdKey } from "react-icons/md";
import handleLogin from "../../api/handleLogin.js"
import validateLogin from "../../utils/validateLogin.js";
import showToast from "../../utils/showToast.js";
import handleChange from "../../utils/handleChange.js";
import InputField from "../InputField.jsx";

function ModalLogin({ isOpen, closeModal, openModalCadastro }) {
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  });

  const resetForm = () => {
    setFormData({
      email: "",
      senha: "",
    });
    setErrors({});
  };

  const handleClose = () => {
    resetForm();
    closeModal();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const validationErrors = validateLogin(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const data = await handleLogin(formData);

    if (data.status == "erro") {
      showToast(data.mensagem || data.mensagens);
    } else {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("idUsuario", data.id_usuario);

      localStorage.setItem("user", JSON.stringify({
        nome_completo: data.nome_completo,
        nome_usuario: data.nome_usuario,
        foto_perfil: data.foto_perfil
      }))

      showToast(data.mensagem, "success");
      resetForm();
      closeModal();

      navigate("/projetos");
    }
  };

  const handleSwitchToLogin = () => {
    resetForm();
    closeModal();
    openModalCadastro();
  };

  if (!isOpen) return null;

  return (
    <div
      className="inset-0 bg-black/75 fixed flex items-center justify-center"
    >
      <form
        className="bg-white p-5 rounded-lg z-50 w-lg mx-2"
        noValidate
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl text-gray-900 font-semibold">Login</h2>
          <button
            type="button"
            onClick={() => handleClose()}
            className="text-gray-500 hover:text-gray-700 text-2xl font-extrabold cursor-pointer"
            aria-label="Fechar modal"
          >
            ✕
          </button>
        </div>
        <hr className="mx-[-1.3rem] opacity-15 mt-4" />
        <div>
          <InputField
            label="Login (E-mail ou Usuário)"
            name="email"
            value={formData.email}
            onChange={(e) => handleChange(e, setFormData, formData)}
            error={errors.email}
            icon={MdEmail}
            placeholder="email@exemplo.com ou usuario"
          />
          <InputField
            label="Senha"
            name="senha"
            type="password"
            value={formData.senha}
            onChange={(e) => handleChange(e, setFormData, formData)}
            error={errors.senha}
            icon={MdKey}
            placeholder="**********"
          />
        </div>
        <hr className="mx-[-1.3rem] mt-5 opacity-15" />
        <div>
          <button
            type="submit"
            className="bg-amber-600 w-full rounded-sm mt-4 p-2 text-white cursor-pointer hover:bg-amber-700 font-medium transition-all"
          >
            Entrar
          </button>
          <p className="text-center mt-2">
            Não tem uma conta?
            <span
              className="underline cursor-pointer hover:text-blue-900 text-blue-600 font-semibold"
              onClick={handleSwitchToLogin}
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

export default ModalLogin;

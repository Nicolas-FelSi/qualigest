import { useState } from "react";
import { MdAccountCircle, MdEmail, MdKey, MdPerson } from "react-icons/md";
import handleRegister from "../../api/handleRegister";
import validateCadastro from "../../utils/validateCadastro";
import InputField from "../InputField";
import showToast from "../../utils/showToast.js"
import handleChange from "../../utils/handleChange.js"

function ModalCadastro({ isOpen, closeModal, openModalLogin }) {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    nome_completo: "",
    nome_usuario: "",
    email: "",
    senha: "",
    confirmPassword: "",
  });

  const resetForm = () => {
    setFormData({
      nome_completo: "",
      nome_usuario: "",
      email: "",
      senha: "",
      confirmPassword: "",
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

    const validationErrors = validateCadastro(formData, formData.confirmPassword);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const data = await handleRegister({
      nome_completo: formData.nome_completo,
      nome_usuario: formData.nome_usuario,
      email: formData.email,
      senha: formData.senha,
    });

    if (data.status === "sucesso") {
      showToast(data.mensagem, "success");
      resetForm();
      closeModal();
    } else {
      showToast(data.mensagem || data.mensagens);
    }
  };

  const handleSwitchToLogin = () => {
    resetForm();
    closeModal();
    openModalLogin();
  };

  if (!isOpen) return null;

  return (
    <div
      className="inset-0 bg-black/75 fixed flex items-center justify-center"
    >
      <form
        className="bg-white p-5 rounded-lg w-lg mx-2"
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl text-gray-900 font-semibold">Cadastro</h2>
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
        <InputField
          label="Nome completo"
          name="nome_completo"
          value={formData.nome_completo}
          onChange={(e) => handleChange(e, setFormData, formData)}
          error={errors.nome}
          icon={MdPerson}
          placeholder="Informe seu nome completo"
        />
        <InputField
          label="Usuário"
          name="nome_usuario"
          value={formData.nome_usuario}
          onChange={(e) => handleChange(e, setFormData, formData)}
          error={errors.usuario}
          icon={MdAccountCircle}
          placeholder="Informe seu nome de usuário"
        />
        <InputField
          label="E-mail"
          name="email"
          value={formData.email}
          onChange={(e) => handleChange(e, setFormData, formData)}
          error={errors.email}
          icon={MdEmail}
          placeholder="email@exemplo.com"
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
        <InputField
          label="Confirmar senha"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={(e) => handleChange(e, setFormData, formData)}
          error={errors.confirmSenha}
          icon={MdKey}
          placeholder="**********"
        />
        <hr className="mx-[-1.3rem] mt-5 opacity-15" />
        <div>
          <button
            type="submit"
            className="bg-black w-full rounded-sm mt-4 p-2 text-white cursor-pointer hover:bg-black/85 transition-all"
          >
            Cadastrar
          </button>
          <p className="text-center mt-2">
            Já tem uma conta?
            <span
              className="underline cursor-pointer hover:text-blue-900 text-blue-600 font-semibold"
              onClick={handleSwitchToLogin}
            >
              {" "}
              Fazer login
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}

export default ModalCadastro;

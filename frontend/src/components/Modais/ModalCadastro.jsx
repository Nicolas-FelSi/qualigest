import { useState } from "react";
import { toast } from "react-toastify";
import { MdAccountCircle, MdEmail, MdKey, MdPerson } from "react-icons/md";
import handleRegister from "../../api/handleRegister";
import validateCadastro from "../../utils/validateCadastro";

function ModalCadastro({ isOpen, closeModal, openModalLogin }) {
  const [errors, setErrors] = useState({});
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
    setErrors({})

    const validationErrors = validateCadastro(formData, confirmPassword);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const data = await handleRegister(formData);

    if (data.status === "sucesso") {
      closeModal();
      setFormData({
        nome_completo: "",
        nome_usuario: "",
        email: "",
        senha: "",
      });

      const notify = () => toast.success(data.mensagem);
      notify();

      setConfirmPassword("");
    } else {
      if (data.mensagem) {
        const notify = () => toast.error(data.mensagem);
        notify();
      } else {
        const notify = () => {
          data.mensagens.forEach((mensagem) => {
            toast.error(mensagem);
          });
        };
        notify();
      }
      return;
    }
  };

  if (isOpen) {
    return (
      <div
        className="inset-0 bg-black/75 fixed flex items-center justify-center"
        onClick={() => {
          closeModal();
          setFormData({
            nome_completo: "",
            nome_usuario: "",
            email: "",
            senha: "",
          });
          setConfirmPassword("")
          setErrors({});
        }}
      >
        <form
          className="bg-white p-5 rounded-lg w-lg mx-2"
          noValidate
          onSubmit={handleSubmit}
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-xl text-gray-900 font-semibold">Cadastro</h2>
          <hr className="mx-[-1.3rem] opacity-15 mt-4" />
          <div className="mt-2">
            <label
              htmlFor="inputNomeCompleto"
              className="mb-2 text-sm font-medium"
            >
              Nome completo *
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md">
                <MdPerson />
              </span>
              <input
                type="text"
                id="inputNomeCompleto"
                className={`rounded-e-lg bg-gray-50 border text-gray-900 w-full text-sm ${errors.nome ? "border-red-400" : "border-gray-300"} p-2.5`}
                placeholder="Informe seu nome completo"
                name="nome_completo"
                value={formData.nome_completo}
                onChange={handleChange}
              />
            </div>
            {errors.nome && <p className="py-1 px-3 bg-red-100 rounded-sm border border-red-500 mt-1 text-red-700">{errors.nome}</p>}
          </div>
          <div className="mt-2">
            <label
              htmlFor="inputNomeUsuario"
              className="mb-2 text-sm font-medium"
            >
              Usuário *
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md">
                <MdAccountCircle />
              </span>
              <input
                type="text"
                id="inputNomeUsuario"
                className={`rounded-e-lg bg-gray-50 border text-gray-900 w-full text-sm ${errors.usuario ? "border-red-400" : "border-gray-300"} p-2.5`}
                placeholder="Informe seu nome de usuário"
                name="nome_usuario"
                value={formData.nome_usuario}
                onChange={handleChange}
              />
            </div>
            {errors.usuario && <p className="py-1 px-3 bg-red-100 rounded-sm border border-red-500 mt-1 text-red-700">{errors.usuario}</p>}
          </div>
          <div className="mt-2">
            <label
              htmlFor="inputEmailLogin"
              className="mb-2 text-sm font-medium"
            >
              E-mail *
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md">
                <MdEmail />
              </span>
              <input
                type="text"
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
          <div className="mt-2">
            <label
              htmlFor="inputSenhaLogin"
              className="mb-2 text-sm font-medium"
            >
              Senha *
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md">
                <MdKey />
              </span>
              <input
                type="password"
                id="inputSenhaLogin"
                className={`rounded-e-lg bg-gray-50 border text-gray-900 w-full text-sm ${errors.senha ? "border-red-400" : "border-gray-300"} p-2.5`}
                placeholder="**********"
                name="senha"
                value={formData.senha}
                onChange={handleChange}
              />
            </div>
            {errors.senha && <p className="py-1 px-3 bg-red-100 rounded-sm border border-red-500 mt-1 text-red-700">{errors.senha}</p>}
          </div>
          <div className="mt-2">
            <label
              htmlFor="confirmarSenha"
              className="mb-2 text-sm font-medium"
            >
              Confirmar senha *
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md">
                <MdKey />
              </span>
              <input
                type="password"
                id="confirmarSenha"
                className={`rounded-e-lg bg-gray-50 border text-gray-900 w-full text-sm ${errors.confirmSenha ? "border-red-400" : "border-gray-300"} p-2.5`}
                placeholder="**********"
                name="confirmarSenha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            {errors.confirmSenha && <p className="py-1 px-3 bg-red-100 rounded-sm border border-red-500 mt-1 text-red-700">{errors.confirmSenha}</p>}
          </div>
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
                onClick={() => {
                  closeModal();
                  openModalLogin()
                  setFormData({
                    nome_completo: "",
                    nome_usuario: "",
                    email: "",
                    senha: "",
                  });
                  setConfirmPassword("")
                  setErrors({});
                }}
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
}

export default ModalCadastro;

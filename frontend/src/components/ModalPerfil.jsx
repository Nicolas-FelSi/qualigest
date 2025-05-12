import { useState } from "react";
// import { toast } from "react-toastify";
import URL_BASE from "../urlBase";
import { MdAccountCircle, MdEmail, MdPerson } from "react-icons/md";

function ModalPerfil({isOpen, closeModal }) {
//   const urlBase = URL_BASE;
//   const port = import.meta.env.VITE_PORT_BACKEND || 8080;

  const [formData, setFormData] = useState({
    nome_completo: "",
    nome_usuario: "",
    email: "",
  });

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
      formData.email == ""
    ) {
      alert("Preencha todos os campos!");
      return;
    }

    // try {
    //   const response = await fetch(
    //     `http://localhost${
    //       port != 80 ? `:${port}` : ""
    //     }${urlBase}/cadastroUsuario.php`,
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(formData),
    //     }
    //   );

    //   const data = await response.json();

    //   if (data.status === "sucesso") {
    //     closeModal()
    //     setFormData({
    //       nome_completo: "",
    //       nome_usuario: "",
    //       email: "",
    //       senha: "",
    //     });

    //     const notify = () => toast.success(data.mensagem);
    //     notify();

    //     setConfirmPassword("");
    //   } else {
    //     if (data.mensagem) {
    //       const notify = () => toast.error(data.mensagem);
    //       notify();
    //     } else {
    //       const notify = () => {
    //         data.mensagens.forEach((mensagem) => {
    //           toast.error(mensagem);
    //         });
    //       };
    //       notify();
    //     }
    //   }
    // } catch (error) {
    //   console.error("Erro ao cadastrar:", error);
    // }
  };

  if (isOpen) {
    return (
      <div className="inset-0 bg-black/75 fixed flex items-center justify-center" onClick={closeModal}>
        <form
          className="bg-white p-5 rounded-lg w-lg mx-2"
          noValidate
          onSubmit={handleSubmit}
          onClick={e => e.stopPropagation()}
        >
          <h2 className="text-xl text-gray-900 font-semibold">
            Editar perfil
          </h2>
          <hr className="mx-[-1.3rem] opacity-15 mt-4" />
          <div className="mt-2">
            <label
              htmlFor="inputNomeCompleto"
              className="mb-2 text-sm font-medium"
            >
              Nome completo
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md">
                <MdPerson />
              </span>
              <input
                type="text"
                id="inputNomeCompleto"
                className="rounded-e-lg bg-gray-50 border text-gray-900 w-full text-sm border-gray-300 p-2.5"
                placeholder="Informe seu nome completo"
                name="nome_completo"
                value={formData.nome_completo}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mt-2">
            <label
              htmlFor="inputNomeUsuario"
              className="mb-2 text-sm font-medium"
            >
              Usuário
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md">
                  <MdAccountCircle />
              </span>
              <input
                type="text"
                id="inputNomeUsuario"
                className="rounded-e-lg bg-gray-50 border text-gray-900 w-full text-sm border-gray-300 p-2.5"
                placeholder="Informe seu nome de usuário"
                name="nome_usuario"
                value={formData.nome_usuario}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mt-2">
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
                type="text"
                id="inputEmailLogin"
                className="rounded-e-lg bg-gray-50 border text-gray-900 w-full text-sm border-gray-300 p-2.5"
                placeholder="email@exemplo.com"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>
          <hr className="mx-[-1.3rem] mt-5 opacity-15"/>
          <div>
            <button type="submit" className="bg-black w-full rounded-sm mt-4 p-2 text-white cursor-pointer hover:bg-black/85 transition-all">
              Editar
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default ModalPerfil;

import { useEffect, useState } from "react";
import Aside from "../components/Aside";
import ModalPerfil from "../components/Modais/ModalPerfil";
import URL_BASE from "../utils/urlBase";
import { useNavigate } from "react-router-dom";

function Perfil() {
  const urlBase = URL_BASE;
  const port = import.meta.env.VITE_PORT_BACKEND || 8080;
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    nome_completo: "",
    nome_usuario: "",
    email: "",
    senha: "",
    foto: "",
    pontuacao: 0,
    tarefas_concluidas: 0,
    tarefas_em_atraso: 0
  });

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (!localStorage.getItem("isLoggedIn")) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    async function getProfile() {
      try {
        const response = await fetch(
          `http://localhost${port != 80 ? `:${port}` : ""}${urlBase}/perfil.php`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        setFormData(data);
      } catch (error) {
        console.error("Erro ao pegar projetos:", error);
      }
    }
    getProfile()
  }, [])

  return (
    <div className="flex gap-1 lg:gap-3">
      <Aside />
      <main className="h-screen w-full">
        <div className="p-3 bg-white shadow-md mb-1 lg:mb-3">
          <h2 className="text-2xl">Perfil</h2>
        </div>
        <section className="bg-white flex justify-center items-center shadow-md">
          <div className="max-w-5xl w-full p-3 flex flex-col gap-4">
            <div className="flex flex-col lg:flex-row gap-5">
              <img
                className="w-52 h-52 object-cover rounded-full m-auto border border-gray-500"
                src="/images/pessoa1.jpg"
                alt=""
              />
              <form className="w-full">
                <div className="mt-2">
                  <label
                    htmlFor="inputNomeCompleto"
                    className="mb-2 text-sm font-medium"
                  >
                    Nome completo
                  </label>
                  <input
                    type="text"
                    id="inputNomeCompleto"
                    className="rounded-lg bg-gray-50 border text-gray-900 w-full text-sm border-gray-300 p-2.5"
                    placeholder="Informe seu nome completo"
                    name="nome_completo"
                    value={formData.nome_completo}
                    onChange={handleChange}
                  />
                </div>
                <div className="mt-2">
                  <label
                    htmlFor="inputNomeUsuario"
                    className="mb-2 text-sm font-medium"
                  >
                    Usuário
                  </label>
                  <input
                    type="text"
                    id="inputNomeUsuario"
                    className="rounded-lg bg-gray-50 border text-gray-900 w-full text-sm border-gray-300 p-2.5"
                    placeholder="Informe seu nome de usuário"
                    name="nome_usuario"
                    value={formData.nome_usuario}
                    onChange={handleChange}
                  />
                </div>
                <div className="mt-2">
                  <label
                    htmlFor="inputEmail"
                    className="mb-2 text-sm font-medium"
                  >
                    E-mail
                  </label>
                  <input
                    type="email"
                    id="inputEmail"
                    className="rounded-lg bg-gray-50 border text-gray-900 w-full text-sm border-gray-300 p-2.5"
                    placeholder="email@exemplo.com"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="mt-2">
                  <label
                    htmlFor="inputSenha"
                    className="mb-2 text-sm font-medium"
                  >
                    Senha
                  </label>
                  <input
                    type="password"
                    id="inputSenha"
                    className="rounded-lg bg-gray-50 border text-gray-900 w-full text-sm border-gray-300 p-2.5"
                    placeholder="***********"
                    name="senha"
                    value={formData.senha}
                    onChange={handleChange}
                  />
                </div>
              </form>
            </div>
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="bg-blue-200 border border-blue-300 p-4 rounded-2xl font-semibold flex items-center flex-col w-full">
                <p className="text-md">Pontuação total</p>
                <span className="text-lg font-normal">{ formData.pontuacao }</span>
              </div>
              <div className="bg-blue-200 border border-blue-300 p-4 rounded-2xl font-semibold flex items-center flex-col w-full">
                <p className="text-md">Tarefas concluídas</p>
                <span className="text-lg font-normal">{ formData.tarefas_concluidas }</span>
              </div>
              <div className="bg-blue-200 border border-blue-300 p-4 rounded-2xl font-semibold flex items-center flex-col w-full">
                <p className="text-md">Tarefas atrasadas</p>
                <span className="text-lg font-normal">{ formData.tarefas_em_atraso}</span>
              </div>
            </div>
            <div>
              <button
                type="button"
                onClick={openModal}
                className="bg-black text-white rounded-md cursor-pointer hover:bg-black/80 transition-all w-full p-2"
              >
                Editar perfil
              </button>
            </div>
          </div>
        </section>
      </main>
      <ModalPerfil isOpen={isOpen} closeModal={closeModal} />
    </div>
  );
}

export default Perfil;

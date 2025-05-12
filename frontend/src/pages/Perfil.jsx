import Aside from "../components/Aside";

function Perfil() {
  return (
    <div className="flex gap-1 lg:gap-3">
      <Aside />
      <main className="h-screen w-full">
        <div className="p-3 bg-white shadow-sm mb-1 lg:mb-3">
          <h2 className="text-2xl">Perfil</h2>
        </div>
        <section className="bg-white flex justify-center items-center shadow-sm">
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
                  />
                </div>
                <div className="mt-2">
                  <label
                    htmlFor="inputEmailLogin"
                    className="mb-2 text-sm font-medium"
                  >
                    E-mail
                  </label>
                  <input
                    type="text"
                    id="inputEmailLogin"
                    className="rounded-lg bg-gray-50 border text-gray-900 w-full text-sm border-gray-300 p-2.5"
                    placeholder="email@exemplo.com"
                    name="email"
                  />
                </div>
              </form>
            </div>
            <div className="flex flex-col lg:flex-row gap-4">
              <div
                className="bg-blue-200 border border-blue-300 p-4 rounded-2xl font-semibold flex items-center flex-col w-full"
              >
                <p className="text-md">Pontuação total</p>
                <span className="text-lg font-normal">0</span>
              </div>
              <div
                className="bg-blue-200 border border-blue-300 p-4 rounded-2xl font-semibold flex items-center flex-col w-full"
              >
                <p className="text-md">Tarefas concluídas</p>
                <span className="text-lg font-normal">0</span>
              </div>
              <div
                className="bg-blue-200 border border-blue-300 p-4 rounded-2xl font-semibold flex items-center flex-col w-full"
              >
                <p className="text-md">Tarefas atrasadas</p>
                <span className="text-lg font-normal">0</span>
              </div>
            </div>
            <div>
              <button type="button" className="bg-black text-white rounded-md cursor-pointer hover:bg-black/80 transition-all w-full p-2">
                Editar perfil
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Perfil;

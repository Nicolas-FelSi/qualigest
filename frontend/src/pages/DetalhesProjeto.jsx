import { useEffect } from "react";
import Aside from "../components/Aside";
import { useNavigate, useParams } from "react-router-dom";
import getDataProject from "../api/getDataProject"

function DetalhesProjeto() {
  const { idProjeto } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("isLoggedIn")) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    const handleGetDataProject = async () => { 
      const data = await getDataProject(idProjeto);
      console.log(data)
    }
    handleGetDataProject();
  }, [idProjeto]);
  return (
    <div className="flex gap-1 sm:gap-3 h-screen">
      <Aside />
      <main className="w-full">
        <section className="flex flex-col gap-1 sm:gap-3">
          <div className="p-3 bg-white shadow-sm">
            <h2 className="text-xl">Nome do projeto</h2>
          </div>
          <div className="p-3 bg-white shadow-sm">
            <h2 className="text-lg">
              Pontuação total: <span>500pts</span>
            </h2>
          </div>
          <div className="flex flex-col lg:flex-row gap-1 sm:gap-3 mb-3">
            <div className="p-3 bg-white w-full shadow-sm">
              <h2 className="text-lg">Tarefas Pendentes</h2>
              <p>Quantidade</p>
            </div>
            <div className="p-3 bg-white w-full shadow-sm">
              <h2 className="text-lg">Tarefas em Andamento</h2>
              <p>Quantidade</p>
            </div>
            <div className="p-3 bg-white w-full shadow-sm">
              <h2 className="text-lg">Tarefas Concluídas</h2>
              <p>Quantidade</p>
            </div>
          </div>
        </section>
        <section>
          <h2 className="text-2xl font-semibold">Ranking do Grupo</h2>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-center rounded-2xl shadow-sm mt-2 text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Rank
                  </th>
                  <th scope="col" className="px-6 py-3 hidden sm:block"></th>
                  <th scope="col" className="px-6 py-3">
                    Participante
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Pontos
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b border-gray-200">
                  <th
                    scope="row"
                    className="px-3 py-2 font-medium text-gray-900 whitespace-nowrap"
                  >
                    4
                  </th>
                  <td className="px-3 py-2 hidden sm:block">
                    <img
                      className="w-12 h-12 object-cover rounded-full"
                      src="/images/pessoa1.jpg"
                      alt=""
                    />
                  </td>
                  <td className="px-3 py-2">Jessica Felicio</td>
                  <td className="px-3 py-2">79</td>
                </tr>
                <tr className="bg-white border-b border-gray-200">
                  <th
                    scope="row"
                    className="px-3 py-2 font-medium text-gray-900 whitespace-nowrap"
                  >
                    5
                  </th>
                  <td className="px-3 py-2 hidden sm:block">
                    <img
                      className="w-12 h-12 object-cover rounded-full"
                      src="/images/pessoa2.jpg"
                      alt=""
                    />
                  </td>
                  <td className="px-3 py-2">Charles Etorome</td>
                  <td className="px-3 py-2">67</td>
                </tr>
                <tr className="bg-white border-b border-gray-200">
                  <th
                    scope="row"
                    className="px-3 py-2 font-medium text-gray-900 whitespace-nowrap"
                  >
                    6
                  </th>
                  <td className="px-3 py-2 hidden sm:block">
                    <img
                      className="w-12 h-12 object-cover rounded-full"
                      src="/images/pessoa3.jpg"
                      alt=""
                    />
                  </td>
                  <td className="px-3 py-2">Nathan Anderson</td>
                  <td className="px-3 py-2">54</td>
                </tr>
                <tr className="bg-white border-b border-gray-200">
                  <th
                    scope="row"
                    className="px-3 py-2 font-medium text-gray-900 whitespace-nowrap"
                  >
                    7
                  </th>
                  <td className="px-3 py-2 hidden sm:block">
                    <img
                      className="w-12 h-12 object-cover rounded-full"
                      src="/images/pessoa4.jpg"
                      alt=""
                    />
                  </td>
                  <td className="px-3 py-2">Matthew Hamilton</td>
                  <td className="px-3 py-2">52</td>
                </tr>
                <tr className="bg-white border-b border-gray-200">
                  <th
                    scope="row"
                    className="px-3 py-2 font-medium text-gray-900 whitespace-nowrap"
                  >
                    8
                  </th>
                  <td className="px-3 py-2 hidden sm:block">
                    <img
                      className="w-12 h-12 object-cover rounded-full"
                      src="/images/pessoa5.jpg"
                      alt=""
                    />
                  </td>
                  <td className="px-3 py-2">Brooke Cagle</td>
                  <td className="px-3 py-2">49</td>
                </tr>
                <tr className="bg-white border-b border-gray-200">
                  <th
                    scope="row"
                    className="px-3 py-2 font-medium text-gray-900 whitespace-nowrap"
                  >
                    9
                  </th>
                  <td className="px-3 py-2 hidden sm:block">
                    <img
                      className="w-12 h-12 object-cover rounded-full"
                      src="/images/pessoa6.jpg"
                      alt=""
                    />
                  </td>
                  <td className="px-3 py-2">Ivana Cajina</td>
                  <td className="px-3 py-2">7</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

export default DetalhesProjeto;

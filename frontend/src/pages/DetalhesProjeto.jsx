import { useEffect, useState } from "react";
import Aside from "../components/Aside";
import { useNavigate, useParams } from "react-router-dom";
import getDataProject from "../api/getDataProject"
import { MdCheckBox, MdWarning, MdHourglassBottom } from "react-icons/md"
import handleImageProfile from "../utils/handleImageProfile";
import Header from "../components/Header";

function DetalhesProjeto() {
  const { idProjeto } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    nome_projeto: "",
    pontuacao_total: 0,
    tarefas_concluidas: 0,
    tarefas_atrasadas: 0,
    tarefas_em_andamento: 0,
    participantes: []
  })

  useEffect(() => {
    if (!localStorage.getItem("isLoggedIn")) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    const handleGetDataProject = async () => { 
      const data = await getDataProject(idProjeto);
      setFormData(data)
    }
    setUser(JSON.parse(localStorage.getItem("user")))
    handleGetDataProject();
  }, [idProjeto]);
  return (
    <div className="flex gap-2 sm:gap-4 h-screen">
      <Aside />
      <main className="w-full mr-2 lg:mr-4 flex-1 overflow-y-auto">
        <section className="flex flex-col gap-2 sm:gap-4">
          <Header titleHeader={formData.nome_projeto} user={user}/>
          <div className="p-3 bg-white shadow-sm rounded-lg">
            <h2 className="text-xl">
              Pontuação total: <span className="font-medium text-xl">{formData.pontuacao_total}</span> pontos
            </h2>
          </div>
          <div className="flex flex-col lg:flex-row gap-1 sm:gap-3 mb-3 text-gray-800">
            <div className="p-3 bg-red-100 border border-red-200 w-full shadow-sm rounded-lg font-medium flex gap-5 items-center">
              <MdWarning size={20}/>
              <div>
                <h2 className="text-lg">Tarefas Atrasadas</h2>
                <p className="text-2xl">{ formData.tarefas_atrasadas }</p>
              </div>
            </div>
            <div className="p-3 bg-amber-100 border border-amber-200 w-full shadow-sm rounded-lg font-medium flex gap-5 items-center">
              <MdHourglassBottom size={20} />
              <div>
                <h2 className="text-lg">Tarefas em Andamento</h2>
                <p className="text-2xl">{ formData.tarefas_em_andamento }</p>
              </div>
            </div>
            <div className="p-3 bg-green-100 border border-green-200 w-full shadow-sm rounded-lg font-medium flex gap-5 items-center">
              <MdCheckBox size={20}/>
              <div>
                <h2 className="text-lg">Tarefas Concluídas</h2>
                <p className="text-2xl">{ formData.tarefas_concluidas }</p>
              </div>
            </div>
          </div>
        </section>
        <section>
          <h2 className="text-2xl font-semibold">Ranking do Grupo</h2>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-center rounded-2xl shadow-sm mt-2 text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-blue-50">
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
                {
                  formData.participantes.map((participante, index) => {
                    const imagemSrc = handleImageProfile(participante.foto_perfil);

                    return (
                      <tr key={participante.id_usuario} className="bg-white border-b border-gray-200 text-gray-900 font-medium">
                        <th
                          scope="row"
                          className="px-3 py-2 font-medium text-gray-900 whitespace-nowrap"
                        >
                          { index == 0 && (
                              <span className="ml-[-10px] lg:ml-[-50px] mr-7">🥇</span>
                            )
                          }
                          { index == 1 && (
                              <span className="ml-[-10px] lg:ml-[-50px] mr-7">🥈</span>
                            )
                          }
                          { index == 2 && (
                              <span className="ml-[-10px] lg:ml-[-50px] mr-7">🥉</span>
                            )
                          }
                          <span>{index+1}</span>
                        </th>
                        <td className="px-3 py-2 hidden sm:block">
                          <img
                            className="w-12 h-12 object-cover rounded-full"
                            src={imagemSrc}
                            alt="Foto de perfil do usuário"
                          />
                        </td>
                        <td className="px-3 py-2 overflow-ellipsis overflow-hidden whitespace-nowrap">{ participante.nome_completo }</td>
                        <td className="px-3 py-2">{ participante.pontuacao }</td>
                      </tr>
                  )})
                }
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

export default DetalhesProjeto;

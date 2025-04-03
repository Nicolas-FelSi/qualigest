import Aside from "../components/Aside";
import '../assets/ListaTarefas.css'

function ListaTarefas() {
  return (
    <>
      <div className="d-flex gap-1 gap-lg-3">
        <Aside />
        <main className="w-100">
          <form className="px-2 py-2 bg-white d-flex flex-column gap-2 flex-md-row justify-content-between">
            <div className="input-group w-100">
              <input type="text" className="form-control" placeholder="Pesquisar" aria-label="Pesquisar" aria-describedby="basic-addon1"/>
              <button className="input-group-text" id="basic-addon1">
                <i className="bi bi-search"></i>
              </button>
            </div>
            <button className="border-0 rounded-1 p-2 text-nowrap btn-nova-tarefa me-md-5" data-bs-toggle="modal" data-bs-target="#novaTarefaModal">Nova tarefa</button>
          </form>
          <section className="mt-1 mt-md-3">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead className="text-center">
                  <tr>
                    <th scope="col">Hoje</th>
                    <th></th>
                    <th scope="col">Data limite</th>
                    <th scope="col">Status</th>
                    <th scope="col">Prioridade</th>
                    <th scope="col">Responsáveis</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  <tr>
                    <th scope="row">
                      <input type="checkbox" name="" id="" />
                    </th>
                    <td>Relatório mensal finalizado</td>
                    <td>Hoje</td>
                    <td>
                      <span className="badge text-bg-secondary">Concluído</span>
                    </td>
                    <td>
                      <span className="badge text-bg-danger">Alta</span>
                    </td>
                    <td>
                      <img src="../assets/images/pessoa6.jpg" alt="" />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <input type="checkbox" name="" id="" />
                    </th>
                    <td>Assinatura de contrato</td>
                    <td>Hoje</td>
                    <td>
                      <span className="badge text-bg-secondary">Em andamento</span>
                    </td>
                    <td>
                      <span className="badge text-bg-warning">Média</span>
                    </td>
                    <td>
                      <img src="../assets/images/pessoa5.jpg" alt="" />
                      <img src="../assets/images/pessoa1.jpg" alt="" />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <input type="checkbox" name="" id="" />
                    </th>
                    <td>Visão geral do mercado</td>
                    <td>Hoje</td>
                    <td>
                      <span className="badge text-bg-secondary">Em andamento</span>
                    </td>
                    <td>
                      <span className="badge text-bg-success">Baixa</span>
                    </td>
                    <td>
                      <img src="../assets/images/pessoa4.jpg" alt="" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>

      {/* Modal nova tarefa */}
      <div className="modal fade" id="novaTarefaModal" tabIndex="-1" aria-labelledby="novaTarefaModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title fs-5" id="novaTarefaModalLabel">Nova tarefa</h2>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    name="tituloTarefaId"
                    id="tituloTarefaId"
                    placeholder=""
                  />
                  <label htmlFor="tituloTarefaId">Título da tarefa</label>
                </div>
                <div className="form-floating mb-3">
                  <textarea
                    className="form-control"
                    name="descricaoTarefaId1"
                    id="descricaoTarefaId1"
                    placeholder=""
                  />
                  <label htmlFor="descricaoTarefaId1">Descrição da tarefa</label>
                </div>
                
                <div className="form-floating mb-3">
                  <input
                    type="date"
                    className="form-control"
                    name="tituloTarefaId"
                    id="tituloTarefaId"
                    placeholder=""
                  />
                  <label htmlFor="tituloTarefaId">Data de entrega</label>
                </div>
                <div className="form-floating mb-3">
                  <select className="form-select" id="prioridadeSelect" aria-label="prioridade select">
                    <option className="text-body-tertiary" selected>Prioridade</option>
                    <option value="Baixa">Baixa</option>
                    <option value="Moderada">Moderada</option>
                    <option value="Alta">Alta</option>
                    <option value="Urgente">Urgente</option>
                  </select>
                  <label htmlFor="prioridadeSelect">Selecione uma prioridade</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    name="tituloTarefaId"
                    id="tituloTarefaId"
                    placeholder=""
                  />
                  <label htmlFor="tituloTarefaId">Responsável</label>
                </div>
              </form>
            </div>
            <div className="modal-footer justify-content-center">
              <button type="button" className="btn btn-dark w-100" data-bs-dismiss="modal">
                Criar tarefa
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ListaTarefas;








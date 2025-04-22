function ModalNovaTarefa() {
  return (
    <div
      className="modal fade"
      id="novaTarefaModal"
      tabIndex="-1"
      aria-labelledby="novaTarefaModalLabel"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title fs-5" id="novaTarefaModalLabel">
              Nova tarefa
            </h2>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
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
                <select
                  className="form-select"
                  id="prioridadeSelect"
                  aria-label="prioridade select"
                >
                  <option className="text-body-tertiary" defaultValue={true}>
                    Prioridade
                  </option>
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
            <button
              type="button"
              className="btn btn-dark w-100"
              data-bs-dismiss="modal"
            >
              Criar tarefa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalNovaTarefa;

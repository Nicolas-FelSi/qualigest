import styles from "./ListaTarefas.module.css";
import Aside from "../../components/Aside/Aside";
import ModalNovaTarefa from "../../components/ModalNovaTarefa";

function ListaTarefas() {
  return (
    <>
      <div className="d-flex gap-1 gap-lg-3">
        <Aside />
        <main className={`${styles.main} w-100`}>
          <form
            className={`${styles.form} px-2 py-2 bg-white d-flex flex-column gap-2 flex-md-row justify-content-between shadow-sm`}
          >
            <div className="input-group w-100">
              <input
                type="text"
                className="form-control"
                placeholder="Pesquisar"
                aria-label="Pesquisar"
                aria-describedby="basic-addon1"
              />
              <button className="input-group-text" id="basic-addon1">
                <i className="bi bi-search"></i>
              </button>
            </div>
            <button
              className={`border-0 rounded-1 p-2 text-nowrap ${styles["btn-nova-tarefa"]} me-md-5`}
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#novaTarefaModal"
            >
              Nova tarefa
            </button>
          </form>
          <section className="mt-1 mt-md-3">
            <div className="table-responsive">
              <table className="table table-hover shadow-sm">
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
                      <input className={styles["input-checkbox"]} type="checkbox" name="" id="" />
                    </th>
                    <td className={styles.td}>Relatório mensal finalizado</td>
                    <td className={styles.td}>Hoje</td>
                    <td className={styles.td}>
                      <span className="badge text-bg-secondary">Concluído</span>
                    </td>
                    <td className={styles.td}>
                      <span className="badge text-bg-danger">Alta</span>
                    </td>
                    <td className={styles.td}>
                      <img src="/images/pessoa6.jpg" alt="" />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <input className={styles["input-checkbox"]} type="checkbox" name="" id="" />
                    </th>
                    <td className={styles.td}>Assinatura de contrato</td>
                    <td className={styles.td}>Hoje</td>
                    <td className={styles.td}>
                      <span className="badge text-bg-secondary">
                        Em andamento
                      </span>
                    </td>
                    <td className={styles.td}>
                      <span className="badge text-bg-warning">Média</span>
                    </td>
                    <td className={styles.td}>
                      <img src="/images/pessoa5.jpg" alt="" />
                      <img src="/images/pessoa1.jpg" alt="" />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <input className={styles["input-checkbox"]} type="checkbox" name="" id="" />
                    </th>
                    <td className={styles.td}>Visão geral do mercado</td>
                    <td className={styles.td}>Hoje</td>
                    <td className={styles.td}>
                      <span className="badge text-bg-secondary">
                        Em andamento
                      </span>
                    </td>
                    <td className={styles.td}>
                      <span className="badge text-bg-success">Baixa</span>
                    </td>
                    <td className={styles.td}>
                      <img src="/images/pessoa4.jpg" alt="" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
      
      <ModalNovaTarefa/>
    </>
  );
}

export default ListaTarefas;

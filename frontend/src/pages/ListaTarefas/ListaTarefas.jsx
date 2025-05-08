import styles from "./ListaTarefas.module.css";
import Aside from "../../components/Aside/Aside";
import ModalNovaTarefa from "../../components/ModalNovaTarefa";

function ListaTarefas() {
  return (
    <>
      <div className="d-flex gap-1 gap-lg-3">
        <Aside />
        <main className="w-100">
          <form
            className="px-2 py-2 bg-white shadow-sm"
          >
            <div className="input-group w-100">
              <input
                type="text"
                className="form-control bg-secondary-subtle border border-secondary-subtle"
                placeholder="Pesquisar"
                aria-label="Pesquisar"
                aria-describedby="basic-addon1"
              />
              <button className="input-group-text" id="basic-addon1">
                <i className="bi bi-search"></i>
              </button>
            </div>
            {/* BOTÃO VISÍVEL APENAS PARA COORDENADOR DO PROJETO */}
            {/* <button
              className={`border-0 rounded-1 p-2 text-nowrap ${styles["btn-nova-tarefa"]} me-md-5`}
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#novaTarefaModal"
            >
              Nova tarefa
            </button> */}
          </form>
          <section className="mt-1 mt-md-3 row gap-3 d-flex flex-grow-1">
            <div className={`${styles["cards-tarefas"]} bg-white border-secondary-subtle border p-3 rounded-2 shadow-sm col-12 col-lg-5 col-xl-3 flex-fill`}>
              <div className="d-flex justify-content-between">
                <h3 className="fs-5">Fazer tela criação de projetos</h3>
                <p>Pontos: 20</p>
              </div>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perferendis illum suscipit consequuntur vel distinctio quis aliquid dolor laudantium, nihil ipsum aperiam, ipsa possimus, sapiente modi natus corporis itaque! Eveniet, temporibus.</p>
              <p className="badge text-bg-secondary">Em andamento</p>
              <p className="ms-2 badge text-bg-danger">Urgente</p>
              <p>Criada em: 13/05/2024</p>
              <p>Entrega em: 24/05/2024</p>
              <div>
                <img className={`${styles.img} border border-black`} src="/images/pessoa1.jpg" alt="" />
                <img className={`${styles.img} border border-black`} src="/images/pessoa2.jpg" alt="" />
                <img className={`${styles.img} border border-black`} src="/images/pessoa3.jpg" alt="" />
              </div>
            </div>

            <div className={`${styles["cards-tarefas"]} bg-white border-secondary-subtle border p-3 rounded-2 shadow-sm col-12 col-lg-5 col-xl-3 flex-fill`}>
              <div className="d-flex justify-content-between">
                <h3 className="fs-5">Fazer tela criação de projetos</h3>
                <p>Pontos: 20</p>
              </div>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perferendis illum suscipit consequuntur vel distinctio quis aliquid dolor laudantium, nihil ipsum aperiam, ipsa possimus, sapiente modi natus corporis itaque! Eveniet, temporibus.</p>
              <p className="badge text-bg-secondary">Em andamento</p>
              <p className="ms-2 badge text-bg-danger">Urgente</p>
              <p>Criada em: 13/05/2024</p>
              <p>Entrega em: 24/05/2024</p>
              <div>
                <img className={`${styles.img} border border-black`} src="/images/pessoa1.jpg" alt="" />
                <img className={`${styles.img} border border-black`} src="/images/pessoa2.jpg" alt="" />
                <img className={`${styles.img} border border-black`} src="/images/pessoa3.jpg" alt="" />
              </div>
            </div>

            <div className={`${styles["cards-tarefas"]} bg-white border-secondary-subtle border p-3 rounded-2 shadow-sm col-12 col-lg-5 col-xl-3 flex-fill`}>
              <div className="d-flex justify-content-between">
                <h3 className="fs-5">Fazer tela criação de projetos</h3>
                <p>Pontos: 20</p>
              </div>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perferendis illum suscipit consequuntur vel distinctio quis aliquid dolor laudantium, nihil ipsum aperiam, ipsa possimus, sapiente modi natus corporis itaque! Eveniet, temporibus.</p>
              <p className="badge text-bg-secondary">Em andamento</p>
              <p className="ms-2 badge text-bg-danger">Urgente</p>
              <p>Criada em: 13/05/2024</p>
              <p>Entrega em: 24/05/2024</p>
              <div>
                <img className={`${styles.img} border border-black`} src="/images/pessoa1.jpg" alt="" />
                <img className={`${styles.img} border border-black`} src="/images/pessoa2.jpg" alt="" />
                <img className={`${styles.img} border border-black`} src="/images/pessoa3.jpg" alt="" />
              </div>
            </div>

                        <div className={`${styles["cards-tarefas"]} bg-white border-secondary-subtle border p-3 rounded-2 shadow-sm col-12 col-lg-5 col-xl-3 flex-fill`}>
              <div className="d-flex justify-content-between">
                <h3 className="fs-5">Fazer tela criação de projetos</h3>
                <p>Pontos: 20</p>
              </div>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perferendis illum suscipit consequuntur vel distinctio quis aliquid dolor laudantium, nihil ipsum aperiam, ipsa possimus, sapiente modi natus corporis itaque! Eveniet, temporibus.</p>
              <p className="badge text-bg-secondary">Em andamento</p>
              <p className="ms-2 badge text-bg-danger">Urgente</p>
              <p>Criada em: 13/05/2024</p>
              <p>Entrega em: 24/05/2024</p>
              <div>
                <img className={`${styles.img} border border-black`} src="/images/pessoa1.jpg" alt="" />
                <img className={`${styles.img} border border-black`} src="/images/pessoa2.jpg" alt="" />
                <img className={`${styles.img} border border-black`} src="/images/pessoa3.jpg" alt="" />
              </div>
            </div>
          </section>
        </main>
      </div>
      
      <ModalNovaTarefa/>
    </>
  );
}

export default ListaTarefas;

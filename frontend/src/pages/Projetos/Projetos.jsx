import styles from "./Projetos.module.css";
import Aside from "../../components/Aside/Aside"

function Projetos() {
  

  return (
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
              placeholder="Pesquisar projetos"
              aria-label="Pesquisar"
              aria-describedby="basic-addon1"
            />
            <button className="input-group-text px-4 bg-black" id="basic-addon1">
              <i className="bi bi-search text-white"></i>
            </button>
          </div>
        </form>
        <section className="mt-3 d-flex gap-3">
            <div className="bg-white shadow-sm">
                <h2 className={`${styles.h2} border-bottom p-2`}>Marketing Digital</h2>
                <div className="py-2 px-5 text-center d-flex flex-column">
                    <p className="badge text-bg-secondary fs-6 fw-normal">5 tarefas designadas para você</p>
                    <p className="badge text-bg-warning">1 tarefa está atrasada</p>
                    <ul className="d-flex justify-content-end list-unstyled mt-4">
                        <li>
                            <img className={styles.img} src="/images/pessoa1.jpg" alt="" />
                        </li>
                        <li>
                            <img className={styles.img} src="/images/pessoa2.jpg" alt="" />
                        </li>
                        <li>
                            <img className={styles.img} src="/images/pessoa3.jpg" alt="" />
                        </li>
                        <li>
                            <img className={styles.img} src="/images/pessoa4.jpg" alt="" />
                        </li>
                        <li>
                            <img className={styles.img} src="/images/pessoa5.jpg" alt="" />
                        </li>
                    </ul>
                </div>
                <div className="d-flex gap-5 border-top p-2">
                    <button className={`${styles["button-edit"]} bg-warning border-0 rounded-1 fw-semibold p-2 w-100`}>Editar</button>
                    <button className={`${styles["button-delete"]} bg-danger border-0 rounded-1 fw-semibold p-2 w-100`}>Deletar</button>
                </div>
            </div>
        </section>
      </main>
    </div>
  );
}

export default Projetos;

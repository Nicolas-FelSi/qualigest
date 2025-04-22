import styles from "./PaginaInicial.module.css";
import ModalLogin from "../../components/ModalLogin";
import ModalCadastro from "../../components/ModalCadastro";

function PaginaInicial() {
  return (
    <div>
      <header className={`${styles.header} bg-white d-flex justify-content-between align-items-center p-2 px-3 shadow-sm`}>
        <h1 className={`${styles.h1} fs-1`}>Qualigest</h1>
        <nav className="d-sm-flex d-none gap-4">
          <button
            className="rounded-1 border-0 px-4 py-2 fw-semibold"
            data-bs-toggle="modal"
            data-bs-target="#loginModal"
          >
            Entrar
          </button>
          <button
            className="rounded-1 border-0 px-4 py-2 fw-semibold"
            data-bs-toggle="modal"
            data-bs-target="#cadastroModal"
          >
            Cadastrar
          </button>
        </nav>
        <button
          type="button"
          className="border-0 bg-transparent d-sm-none"
          data-bs-toggle="offcanvas"
          data-bs-target="#menuPaginaInicial"
          aria-controls="menuPaginaInicial"
        >
          <i className={`bi bi-list fs-1 ${styles["btn-menu"]}`}></i>
        </button>
      </header>
      <main className="d-flex align-items-center flex-column pb-3 p-2">
        <h2 className={`${styles.h2} py-3`}>Bem-vindo ao QualiGest</h2>
        <p className="fw-semibold fs-5 text-center">
          Gerencie suas tarefas com eficiência e colaboração
        </p>
        <div className="py-5">
          <img className="img-fluid" src="/images/equipe-tarefa.png" alt="" />
        </div>
        <div className="d-flex gap-3 flex-wrap justify-content-center row mx-2">
          <div className="bg-white p-4 rounded-1 d-flex flex-column gap-2 col shadow-sm">
            <img
              className={styles["img-padrao"]}
              src="/images/tarefas.webp"
              alt=""
            />
            <h2 className="fs-5">Priorização de tarefas</h2>
            <p>Organize suas tarefas de acordo com a prioridade e prazo</p>
          </div>
          <div className="bg-white p-4 rounded-1 d-flex flex-column gap-2 col shadow-sm">
            <img
              className={styles["img-menor"]}
              src="/images/prazo.png"
              alt=""
            />
            <h2 className="fs-5">Gerenciamento de Prazos</h2>
            <p>Acompanhe os prazos de cada projeto com facilidade</p>
          </div>
          <div className="bg-white p-4 rounded-1 d-flex flex-column gap-2 col shadow-sm">
            <img
              className={styles["img-padrao"]}
              src="/images/equipe.png"
              alt=""
            />
            <h2 className="fs-5">Colaboração em Equipe</h2>
            <p>Trabalhe em conjunto atribuindo responsabilidades</p>
          </div>
        </div>
      </main>

      {/* <!-- Menu --> */}
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="menuPaginaInicial"
        aria-labelledby="menuPaginaInicialLabel"
      >
        <div className="offcanvas-header">
          <h5 className={styles["offcanvas-title"]} id="menuPaginaInicialLabel">
            QualiGest
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body p-0">
          <nav className="d-flex gap-4 flex-column text-center w-100">
            <a
              className="rounded-1 border-0 text-decoration-none border-bottom w-100"
              data-bs-toggle="modal"
              data-bs-target="#loginModal"
            >
              Entrar
            </a>
            <a
              className="rounded-1 border-0 text-decoration-none border-bottom w-100"
              data-bs-toggle="modal"
              data-bs-target="#cadastroModal"
            >
              Cadastrar
            </a>
          </nav>
        </div>
      </div>

      <ModalLogin />
      <ModalCadastro />
    </div>
  );
}

export default PaginaInicial;

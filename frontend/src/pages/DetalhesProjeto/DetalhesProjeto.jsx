import Aside from "../../components/Aside/Aside";
import styles from "./DetalhesProjeto.module.css";

function DetalhesProjeto() {
  return (
    <div className="d-flex gap-3 vh-100">
      <Aside />
      <main className="w-100">
        <section className={`${styles["dados-projeto"]} d-flex flex-column gap-3`}>
          <div className={`p-3 bg-white ${styles["detalhe-projeto"]} shadow-sm`}>
            <h2>Nome do projeto</h2>
          </div>
          <div className={`p-3 bg-white ${styles["detalhe-projeto"]} shadow-sm`}>
            <h2>
              Pontuação total: <span>500pts</span>
            </h2>
          </div>
          <div className="d-flex gap-3 mb-3">
            <div className={`p-3 bg-white w-100 ${styles["detalhe-projeto"]} shadow-sm`}>
              <h2>Tarefas Pendentes</h2>
              <p>Quantidade</p>
            </div>
            <div className={`p-3 bg-white w-100 ${styles["detalhe-projeto"]} shadow-sm`}>
              <h2>Tarefas em Andamento</h2>
              <p>Quantidade</p>
            </div>
            <div className={`p-3 bg-white w-100 ${styles["detalhe-projeto"]} shadow-sm`}>
              <h2>Tarefas Concluídas</h2>
              <p>Quantidade</p>
            </div>
          </div>
        </section>
        <section className="d-flex gap-3">
          <div className={`${styles.ranking} w-50`}>
            <h2>Ranking do Grupo</h2>
            <div className="d-flex justify-content-between text-center">
              <div className="flex-column ">
                <img src="/images/pessoa1.jpg" alt="" />
                <p className={`${styles.podio} mt-3`}>Roberto</p>
                <div className={`${styles.podio} mt-3`}>
                  <i></i>
                  <p>110 Pontos</p>
                </div>
              </div>
              <div>
                <img src="/images/pessoa6.jpg" alt="" />
                <p className={`${styles.podio} mt-3`}>Carla</p>
                <div className={`${styles.podio} mt-3`}>
                  <i></i>
                  <p>110 Pontos</p>
                </div>
              </div>
              <div>
                <img src="/images/pessoa3.jpg" alt="" />
                <p className={`${styles.podio} mt-3`}>Nicolas</p>
                <div className={`${styles.podio} mt-3`}>
                  <i></i>
                  <p>110 Pontos</p>
                </div>
              </div>
            </div>
          </div>
          <table className={`${styles["tag-table"]} table w-50 text-center rounded-4 shadow-sm`}>
            <thead>
              <tr>
                <th scope="col">Rank</th>
                <th scope="col"></th>
                <th scope="col">Participante</th>
                <th scope="col">Pontos</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">4</th>
                <td>
                  <img src="/images/pessoa1.jpg" alt="" />
                </td>
                <td>Jessica Felicio</td>
                <td>79</td>
              </tr>
              <tr>
                <th scope="row">5</th>
                <td>
                  <img src="/images/pessoa2.jpg" alt="" />
                </td>
                <td>Charles Etorome</td>
                <td>67</td>
              </tr>
              <tr>
                <th scope="row">6</th>
                <td>
                  <img src="/images/pessoa3.jpg" alt="" />
                </td>
                <td>Nathan Anderson</td>
                <td>54</td>
              </tr>
              <tr>
                <th scope="row">7</th>
                <td>
                  <img src="/images/pessoa4.jpg" alt="" />
                </td>
                <td>Matthew Hamilton</td>
                <td>52</td>
              </tr>
              <tr>
                <th scope="row">8</th>
                <td>
                  <img src="/images/pessoa5.jpg" alt="" />
                </td>
                <td>Brooke Cagle</td>
                <td>49</td>
              </tr>
              <tr>
                <th scope="row">9</th>
                <td>
                  <img src="/images/pessoa6.jpg" alt="" />
                </td>
                <td>Ivana Cajina</td>
                <td>47</td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}

export default DetalhesProjeto;

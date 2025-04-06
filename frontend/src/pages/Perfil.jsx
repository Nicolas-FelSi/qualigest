import Aside from "../components/Aside";

function Perfil() {
  return (
    <>
      <div className="d-flex gap-1 gap-lg-3">
        <Aside />
        <main className="w-100">
          <div className="p-3 bg-white header-perfil mb-1 mb-lg-3">
            <h2 className="fs-4 m-0">Perfil</h2>
          </div>
          <section className="bg-white d-flex justify-content-center align-items-center">
            <div className="div-perfil w-100 p-3 d-flex flex-column gap-4">
              <div className="d-flex flex-column flex-lg-row gap-5">
                <img className="m-auto" src="../assets/images/pessoa1.jpg" alt=""/>
                <form className="w-100">
                  <div className="mb-3">
                    <label htmlFor="emailId" className="form-label">E-mail</label>
                    <input type="email" className="form-control p-2" id="emailId" placeholder="exemplo@gmail.com"/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="senhaId" className="form-label">Senha</label>
                    <input type="password" className="form-control p-2" id="senhaId" placeholder="*******"/>
                  </div>
                </form>
              </div>
              <div className="d-flex flex-column flex-lg-row gap-4">
                <div className="p-4 rounded-5 fw-semibold d-flex align-items-center flex-column w-100">
                  <p className="fs-6">Pontuação total</p>
                  <span className="fs-3 fw-normal">0</span>
                </div>
                <div className="p-4 rounded-5 fw-semibold d-flex align-items-center flex-column w-100">
                  <p className="fs-6">Tarefas concluídas</p>
                  <span className="fs-3 fw-normal">0</span>
                </div>
                <div className="p-4 rounded-5 fw-semibold d-flex align-items-center flex-column w-100">
                  <p className="fs-6">Tarefas atrasadas</p>
                  <span className="fs-3 fw-normal">0</span>
                </div>
              </div>
              <div>
                <button type="button" className="btn btn-dark w-100 p-2">Editar perfil</button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  )
}

export default Perfil;

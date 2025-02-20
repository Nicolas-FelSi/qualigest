<template>
  <header class="bg-white d-flex justify-content-between align-items-center py-2 px-5">
    <h1>Qualigest</h1>
    <nav class="d-flex gap-4">
      <button class="rounded-1 border-0" data-bs-toggle="modal" data-bs-target="#loginModal">
        Entrar
      </button>
      <button class="rounded-1 border-0" data-bs-toggle="modal" data-bs-target="#cadastroModal">
        Cadastrar
      </button>
    </nav>
  </header>
  <main class="d-flex align-items-center flex-column pb-3">
    <h2 class="py-3">Bem-vindo ao QualiGest</h2>
    <p class="fw-bold">Gerencie suas tarefas com eficiência e colaboração</p>
    <div class="imagem-central py-5">
      <img src="@/assets/images/equipe-tarefa.png" alt="" />
    </div>
    <div class="d-flex gap-3 flex-wrap justify-content-center">
      <div class="bg-white p-4 rounded-1 d-flex flex-column gap-2">
        <img class="img-padrao" src="@/assets/images/tarefas.webp" alt="" />
        <h2 class="fs-5">Priorização de tarefas</h2>
        <p>Organize suas tarefas de acordo com a prioridade e prazo</p>
      </div>
      <div class="bg-white p-4 rounded-1 d-flex flex-column gap-2">
        <img class="img-menor" src="@/assets/images/prazo.png" alt="" />
        <h2 class="fs-5">Gerenciamento de Prazos</h2>
        <p>Acompanhe os prazos de cada projeto com facilidade</p>
      </div>
      <div class="bg-white p-4 rounded-1 d-flex flex-column gap-2">
        <img class="img-padrao" src="@/assets/images/equipe.png" alt="" />
        <h2 class="fs-5">Colaboração em Equipe</h2>
        <p>Trabalhe em conjunto atribuindo responsabilidades</p>
      </div>
    </div>
  </main>

  <!-- Modal Login -->
  <div class="modal fade" id="loginModal" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title fs-5" id="loginModalLabel">Login</h2>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="input-group mb-3">
              <span class="input-group-text">@</span>
              <div class="form-floating">
                <input type="email" class="form-control" id="inputEmail" placeholder="" />
                <label for="inputEmail">E-mail</label>
              </div>
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text">
                <i class="bi bi-key"></i>
              </span>
              <div class="form-floating">
                <input type="password" class="form-control" id="inputSenha" placeholder="" />
                <label for="inputSenha">Senha</label>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer justify-content-center">
          <button type="button" class="btn btn-dark w-100" data-bs-dismiss="modal">
            Entrar
          </button>
          <p>
            Não tem uma conta?
            <span role="button" data-bs-toggle="modal" data-bs-target="#cadastroModal"
              class="text-decoration-underline text-primary fw-semibold">Cadastre-se</span>
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal Cadastro -->
  <div class="modal fade" id="cadastroModal" tabindex="-1" aria-labelledby="cadastroModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title fs-5" id="cadastroModalLabel">Cadastro</h2>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="input-group mb-3">
              <div class="form-floating">
                <input type="text" class="form-control" id="inputNomeCompleto" placeholder="" />
                <label for="inputNomeCompleto">Nome completo</label>
              </div>
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text">
                <i class="bi bi-person-circle"></i>
              </span>
              <div class="form-floating">
                <input type="text" class="form-control" id="inputNomeUsuario" placeholder="" />
                <label for="inputNomeUsuario">Nome de usuário</label>
              </div>
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text">@</span>
              <div class="form-floating">
                <input type="email" class="form-control" id="inputEmail" placeholder="" />
                <label for="inputEmail">E-mail</label>
              </div>
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text">
                <i class="bi bi-key"></i>
              </span>
              <div class="form-floating">
                <input type="password" class="form-control" id="inputSenha" placeholder="" />
                <label for="inputSenha">Senha</label>
              </div>
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text">
                <i class="bi bi-key"></i>
              </span>
              <div class="form-floating">
                <input type="password" class="form-control" id="inputConfirmarSenha" placeholder="" />
                <label for="inputConfirmarSenha">Confirme sua senha</label>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer justify-content-center">
          <button type="button" class="btn btn-dark w-100" data-bs-dismiss="modal">
            Cadastrar
          </button>
          <p>
            Já possui uma conta?
            <span role="button" data-bs-toggle="modal" data-bs-target="#loginModal"
              class="text-decoration-underline text-primary fw-semibold">Fazer login</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
header {
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.089);
}

h1,
h2:first-child {
  color: var(--amarelo);
}

header button {
  padding: 0.25rem 1.5rem !important;
  background-color: var(--azul);
}

.d-flex>.bg-white {
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.089);
}

.img-padrao {
  width: 150px;
}

.img-menor {
  width: 100px;
}

.imagem-central img {
  width: 500px;
}
</style>

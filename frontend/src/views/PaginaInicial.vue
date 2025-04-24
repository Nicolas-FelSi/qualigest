<template>
  <header class="bg-white d-flex justify-content-between align-items-center py-2 px-3 shadow-sm">
    <h1>Qualigest</h1>
    <nav class="d-sm-flex d-none gap-4">
      <button class="rounded-1 border-0 px-4 py-2 fw-semibold" data-bs-toggle="modal" data-bs-target="#loginModal">
        Entrar
      </button>
      <button class="rounded-1 border-0 px-4 py-2 fw-semibold" data-bs-toggle="modal" data-bs-target="#cadastroModal">
        Cadastrar
      </button>
    </nav>
    <button type="button" class="border-0 bg-transparent d-sm-none" data-bs-toggle="offcanvas" data-bs-target="#menuPaginaInicial" aria-controls="menuPaginaInicial">
      <i class="bi bi-list fs-1 btn-menu"></i>
    </button>
  </header>
  <main class="d-flex align-items-center flex-column pb-3 p-2">
    <h2 class="py-3">Bem-vindo ao QualiGest</h2>
    <p class="fw-semibold fs-5 text-center">Gerencie suas tarefas com eficiência e colaboração</p>
    <div class="py-5">
      <img class="img-fluid" src="@/assets/images/equipe-tarefa.png" alt="" />
    </div>
    <div class="d-flex gap-3 flex-wrap justify-content-center row mx-2">
      <div class="bg-white p-4 rounded-1 d-flex flex-column gap-2 col shadow-sm">
        <img class="img-padrao" src="@/assets/images/tarefas.webp" alt="" />
        <h2 class="fs-5">Priorização de tarefas</h2>
        <p>Organize suas tarefas de acordo com a prioridade e prazo</p>
      </div>
      <div class="bg-white p-4 rounded-1 d-flex flex-column gap-2 col shadow-sm">
        <img class="img-menor" src="@/assets/images/prazo.png" alt="" />
        <h2 class="fs-5">Gerenciamento de Prazos</h2>
        <p>Acompanhe os prazos de cada projeto com facilidade</p>
      </div>
      <div class="bg-white p-4 rounded-1 d-flex flex-column gap-2 col shadow-sm">
        <img class="img-padrao" src="@/assets/images/equipe.png" alt="" />
        <h2 class="fs-5">Colaboração em Equipe</h2>
        <p>Trabalhe em conjunto atribuindo responsabilidades</p>
      </div>
    </div>
  </main>

  <!-- Menu -->
  <div class="offcanvas offcanvas-start" tabindex="-1" id="menuPaginaInicial" aria-labelledby="menuPaginaInicialLabel">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="menuPaginaInicialLabel">QualiGest</h5>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body p-0">
      <nav class="d-flex gap-4 flex-column text-center w-100">
        <a class="rounded-1 border-0 text-decoration-none border-bottom w-100" data-bs-toggle="modal" data-bs-target="#loginModal">
          Entrar
        </a>
        <a class="rounded-1 border-0 text-decoration-none border-bottom w-100" data-bs-toggle="modal" data-bs-target="#cadastroModal">
          Cadastrar
        </a>
      </nav>
    </div>
  </div>

  <!-- Modal Login -->
  <div class="modal fade" id="loginModal" tabindex="-1" aria-labelledby="loginModalLabel">
    <div class="modal-dialog modal-dialog-centered">
      <form class="modal-content" @submit.prevent="enviarLogin">
        <div class="modal-header">
          <h2 class="modal-title fs-5" id="loginModalLabel">Login</h2>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div >
            <div class="input-group mb-3">
              <span class="input-group-text">
                <i class="bi bi-envelope-at-fill"></i>
              </span>
              <div class="form-floating">
                <input type="email" class="form-control" id="inputEmailLogin" v-model="emailLogin" placeholder="" required/>
                <label for="inputEmailLogin">E-mail</label>
              </div>
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text">
                <i class="bi bi-key-fill"></i>
              </span>
              <div class="form-floating">
                <input type="password" class="form-control" id="inputSenhaLogin" v-model="senhaLogin" placeholder="" required/>
                <label for="inputSenhaLogin">Senha</label>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer justify-content-center">
          <button type="submit" class="btn btn-dark w-100" data-bs-dismiss="">
            Entrar
          </button>
          <p>
            Não tem uma conta?
            <span role="button" data-bs-toggle="modal" data-bs-target="#cadastroModal"
              class="text-decoration-underline text-primary fw-semibold">Cadastre-se</span>
          </p>
        </div>
      </form>
    </div>
  </div>

  <!-- Modal Cadastro -->
  <div class="modal fade" id="cadastroModal" tabindex="-1" aria-labelledby="cadastroModalLabel">
    <div class="modal-dialog modal-dialog-centered">
      <form class="modal-content" @submit.prevent="enviarCadastro">
        <div class="modal-header">
          <h2 class="modal-title fs-5" id="cadastroModalLabel">Cadastro</h2>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div>
            <div class="input-group mb-3">
              <span class="input-group-text">
                <i class="bi bi-person-fill"></i>
              </span>
              <div class="form-floating">
                <input type="text" class="form-control" id="inputNomeCompleto" placeholder="" v-model="nomeCompleto" />
                <label for="inputNomeCompleto">Nome completo</label>
              </div>
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text">
                <i class="bi bi-person-circle"></i>
              </span>
              <div class="form-floating">
                <input type="text" class="form-control" id="inputNomeUsuario" placeholder="" v-model="nomeUsuario" />
                <label for="inputNomeUsuario">Nome de usuário</label>
              </div>
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text">
                <i class="bi bi-envelope-at-fill"></i>
              </span>
              <div class="form-floating">
                <input type="email" class="form-control" id="inputEmailCadastro" placeholder="" v-model="emailCadastro" />
                <label for="inputEmailCadastro">E-mail</label>
              </div>
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text">
                <i class="bi bi-key-fill"></i>
              </span>
              <div class="form-floating">
                <input type="password" class="form-control" id="inputSenhaCadastro" placeholder="" v-model="senhaCadastro" />
                <label for="inputSenhaCadastro">Senha</label>
              </div>
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text">
                <i class="bi bi-key-fill"></i>
              </span>
              <div class="form-floating">
                <input type="password" class="form-control" id="inputConfirmarSenha" placeholder="" v-model="confirmarSenha" />
                <label for="inputConfirmarSenha">Confirme sua senha</label>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer justify-content-center">
          <button type="submit" class="btn btn-dark w-100" data-bs-dismiss="modal">
            Cadastrar
          </button>
          <p>
            Já possui uma conta?
            <span role="button" data-bs-toggle="modal" data-bs-target="#loginModal"
              class="text-decoration-underline text-primary fw-semibold">Fazer login</span>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const formLogin = ref({
  emailLogin: "",
  senhaLogin: ""
})

const formCadastro = ref({
  nomeCompleto: "",
  nomeUsuario: "",
  emailCadastro: "",
  senhaCadastro: "",
  confirmarSenha: ""
})

const enviarLogin = async () => {
  if (!(emailLogin.value && senhaLogin.value)) {
    alert("Preencha os campos!");
    return;
  }

  try {

    const response = await fetch({
      host: "http://localhost:5173/login.php",
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `email=${encodeURIComponent(emailLogin.value)}&senha=${encodeURIComponent(senhaLogin.value)}`
    });

  } catch (error) {
    console.log("Erro ao enviar login: ", error);
  }
}

const enviarCadastro = async () => {
  if (!(
    formCadastro.value.emailCadastro && 
    formCadastro.value.senhaCadastro && 
    formCadastro.value.nomeCompleto && 
    formCadastro.value.confirmarSenha && 
    formCadastro.value.nomeUsuario
  )) {
    alert("Preencha os campos!");
    return;
  }

  if (!(formCadastro.value.senhaCadastro != formCadastro.value.confirmarSenha)) {
    alert("Senhas diferentes!");
    return;
  }

  try {
    const response = await fetch({
      host: "http://localhost:8080/qualigest/backend/app/Controllers/cadastroUsuario.php",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome_completo: formCadastro.value.nomeCompleto,
        nome_usuario: formCadastro.value.nomeUsuario,
        email: formCadastro.value.emailCadastro,
        senha: formCadastro.value.senhaCadastro
      })
    });

    const resultado = await response.json();
    console.log(resultado);

  } catch (error) {
    console.log("Erro ao enviar login: ", error);
  }
}

</script>

<style scoped>
h1,
h2:first-child {
  color: var(--amarelo);
}

header nav button {
  background-color: var(--azul);
}

header nav button:hover {
  background-color: rgb(30, 102, 184);
  transition: all .5s;
  color: white;
}

.btn-menu {
  color: var(--amarelo);
}

.offcanvas-title {
  color: var(--amarelo);
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

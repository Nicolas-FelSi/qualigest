<template>
  <div class="d-flex gap-3">
    <Aside />
    <main class="w-100">
      <div class="p-3 bg-white header-perfil mb-3">
        <h2 class="fs-4">Perfil</h2>
      </div>
      <section class="bg-white d-flex justify-content-center align-items-center">
        <div class="div-perfil w-100 p-3 d-flex flex-column gap-4">
          <div class="d-flex align-items-center gap-5">
            <img src="../assets/images/pessoa1.jpg" alt="">
            <form class="w-100">
              <div class="mb-3">
                <label for="emailId" class="form-label">E-mail</label>
                <input type="email" class="form-control p-2" id="emailId" placeholder="exemplo@gmail.com">
              </div>
              <div class="mb-3">
                <label for="senhaId" class="form-label">Senha</label>
                <input type="password" class="form-control p-2" id="senhaId" placeholder="*******">
              </div>
            </form>
          </div>
          <div class="d-flex justify-content-between gap-4">
            <div class="p-4 rounded-5 fw-semibold d-flex align-items-center flex-column w-100">
              <p class="fs-6">Pontuação total</p>
              <span class="fs-3 fw-normal">0</span>
            </div>
            <div class="p-4 rounded-5 fw-semibold d-flex align-items-center flex-column w-100">
              <p class="fs-6">Tarefas concluídas</p>
              <span class="fs-3 fw-normal">0</span>
            </div>
            <div class="p-4 rounded-5 fw-semibold d-flex align-items-center flex-column w-100">
              <p class="fs-6">Tarefas atrasadas</p>
              <span class="fs-3 fw-normal">0</span>
            </div>
          </div>
          <div>
            <button type="button" class="btn btn-dark w-100 p-2">Editar perfil</button>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import Aside from "@/components/Aside.vue";
</script>

<style scoped>
.header-perfil {
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.171) !important;
}

main {
  height: 100vh;
}

.div-perfil {
  max-width: 1000px;
}

img {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 50%;
}

section {
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.171);
}

.p-4.rounded-5 {
  background-color: var(--azul);
}

</style>

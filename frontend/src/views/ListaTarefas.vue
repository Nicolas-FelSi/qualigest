<template>
  <div class="d-flex gap-1 gap-lg-3">
    <Aside />
    <main class="w-100">
      <form @submit.prevent class="px-2 py-2 bg-white d-flex flex-column gap-2 flex-md-row justify-content-between">
        <div class="input-group w-100">
          <input type="text" class="form-control" placeholder="Pesquisar" aria-label="Pesquisar" aria-describedby="basic-addon1">
          <button class="input-group-text" id="basic-addon1">
            <i class="bi bi-search"></i>
          </button>
        </div>
        <button class="border-0 rounded-1 p-2 text-nowrap btn-nova-tarefa me-md-5" data-bs-toggle="modal" data-bs-target="#novaTarefaModal">Nova tarefa</button>
      </form>
      <section class="mt-1 mt-md-3">
        <div class="table-responsive">
          <table class="table table-hover">
            <thead class="text-center">
              <tr>
                <th scope="col">Hoje</th>
                <th></th>
                <th scope="col">Data limite</th>
                <th scope="col">Status</th>
                <th scope="col">Prioridade</th>
                <th scope="col">Responsáveis</th>
              </tr>
            </thead>
            <tbody class="text-center">
              <tr>
                <th scope="row">
                  <input type="checkbox" name="" id="" />
                </th>
                <td>Relatório mensal finalizado</td>
                <td>Hoje</td>
                <td>
                  <span class="badge text-bg-secondary">Concluído</span>
                </td>
                <td>
                  <span class="badge text-bg-danger">Alta</span>
                </td>
                <td>
                  <img src="../assets/images/pessoa6.jpg" alt="" />
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <input type="checkbox" name="" id="" />
                </th>
                <td>Assinatura de contrato</td>
                <td>Hoje</td>
                <td>
                  <span class="badge text-bg-secondary">Em andamento</span>
                </td>
                <td>
                  <span class="badge text-bg-warning">Média</span>
                </td>
                <td>
                  <img src="../assets/images/pessoa5.jpg" alt="" />
                  <img src="../assets/images/pessoa1.jpg" alt="" />
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <input type="checkbox" name="" id="" />
                </th>
                <td>Visão geral do mercado</td>
                <td>Hoje</td>
                <td>
                  <span class="badge text-bg-secondary">Em andamento</span>
                </td>
                <td>
                  <span class="badge text-bg-success">Baixa</span>
                </td>
                <td>
                  <img src="../assets/images/pessoa4.jpg" alt="" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  </div>

  <!-- Modal nova tarefa -->
  <div class="modal fade" id="novaTarefaModal" tabindex="-1" aria-labelledby="novaTarefaModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title fs-5" id="novaTarefaModalLabel">Nova tarefa</h2>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent>
            <div class="form-floating mb-3">
              <input
                type="text"
                class="form-control"
                name="tituloTarefaId"
                id="tituloTarefaId"
                placeholder=""
              />
              <label for="tituloTarefaId">Título da tarefa</label>
            </div>
            <div class="form-floating mb-3">
              <textarea
                class="form-control"
                name="descricaoTarefaId1"
                id="descricaoTarefaId1"
                placeholder=""
              />
              <label for="descricaoTarefaId1">Descrição da tarefa</label>
            </div>
            
            <div class="form-floating mb-3">
              <input
                type="date"
                class="form-control"
                name="tituloTarefaId"
                id="tituloTarefaId"
                placeholder=""
              />
              <label for="tituloTarefaId">Data de entrega</label>
            </div>
            <div class="form-floating mb-3">
              <select class="form-select" id="prioridadeSelect" aria-label="prioridade select">
                <option class="text-body-tertiary" selected>Prioridade</option>
                <option value="Baixa">Baixa</option>
                <option value="Moderada">Moderada</option>
                <option value="Alta">Alta</option>
                <option value="Urgente">Urgente</option>
              </select>
              <label for="prioridadeSelect">Selecione uma prioridade</label>
            </div>
            <div class="form-floating mb-3">
              <input
                type="text"
                class="form-control"
                name="tituloTarefaId"
                id="tituloTarefaId"
                placeholder=""
              />
              <label for="tituloTarefaId">Responsável</label>
            </div>
          </form>
        </div>
        <div class="modal-footer justify-content-center">
          <button type="button" class="btn btn-dark w-100" data-bs-dismiss="modal">
            Criar tarefa
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Aside from "@/components/Aside.vue";
</script>

<style scoped>
main form,
table {
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.171) !important;
}

form input {
  background-color: var(--cinza-claro);
}

.btn-nova-tarefa {
  background-color: var(--amarelo);
}

td img {
  max-width: 100%;
  width: 30px;
  height: 30px;
  object-fit: cover;
  border-radius: 50%;
}

input[type="checkbox"] {
  width: 15px;
  height: 15px;
}

@media (min-width: 768px) {
  main form > div {
    width: 50% !important;
  }
}
</style>

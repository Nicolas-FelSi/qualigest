<template>
  <div class="d-flex gap-3">
    <Aside />
    <main class="w-100">
      <form @submit.prevent class="px-5 py-3 py-1 bg-white d-flex align-items-center justify-content-between">
        <div class="input-group w-50">
          <input type="text" class="form-control" placeholder="Pesquisar" aria-label="Pesquisar" aria-describedby="basic-addon1">
          <button class="input-group-text" id="basic-addon1">
            <i class="bi bi-search"></i>
          </button>
        </div>
        <button class="border-0 rounded-1 p-2 text-nowrap btn-nova-tarefa" data-bs-toggle="modal" data-bs-target="#novaTarefaModal">Nova tarefa</button>
      </form>
      <section class="mt-3">
        <table class="table table-hover">
          <thead>
            <tr>
              <th class="text-center" scope="col">Hoje</th>
              <th class="text-center"></th>
              <th class="text-center" scope="col">Data limite</th>
              <th class="text-center" scope="col">Status</th>
              <th class="text-center" scope="col">Prioridade</th>
              <th class="text-center" scope="col">Responsáveis</th>
            </tr>
          </thead>
          <tbody>
            <tr role="button">
              <th class="text-center" scope="row">
                <input type="checkbox" name="" id="" />
              </th>
              <td>Relatório mensal finalizado</td>
              <td class="text-center">Hoje</td>
              <td class="text-center">
                <span class="badge text-bg-secondary">Concluído</span>
              </td>
              <td class="text-center">
                <span class="badge text-bg-danger">Alta</span>
              </td>
              <td class="text-center">
                <img src="../assets/images/pessoa6.jpg" alt="" />
              </td>
            </tr>
            <tr role="button">
              <th class="text-center" scope="row">
                <input type="checkbox" name="" id="" />
              </th>
              <td>Assinatura de contrato</td>
              <td class="text-center">Hoje</td>
              <td class="text-center">
                <span class="badge text-bg-secondary">Em andamento</span>
              </td>
              <td class="text-center">
                <span class="badge text-bg-warning">Média</span>
              </td>
              <td class="text-center">
                <img src="../assets/images/pessoa5.jpg" alt="" />
                <img src="../assets/images/pessoa1.jpg" alt="" />
              </td>
            </tr>
            <tr role="button">
              <th class="text-center" scope="row">
                <input type="checkbox" name="" id="" />
              </th>
              <td>Visão geral do mercado</td>
              <td class="text-center">Hoje</td>
              <td class="text-center">
                <span class="badge text-bg-secondary">Em andamento</span>
              </td>
              <td class="text-center">
                <span class="badge text-bg-success">Baixa</span>
              </td>
              <td class="text-center">
                <img src="../assets/images/pessoa4.jpg" alt="" />
              </td>
            </tr>
          </tbody>
        </table>

        <table class="table table-hover">
          <thead>
            <tr role="button">
              <th class="text-center" scope="col">Hoje</th>
              <th class="text-center"></th>
              <th class="text-center" scope="col">Data limite</th>
              <th class="text-center" scope="col">Status</th>
              <th class="text-center" scope="col">Prioridade</th>
              <th class="text-center" scope="col">Responsáveis</th>
            </tr>
          </thead>
          <tbody>
            <tr role="button">
              <th class="text-center" scope="row">
                <input type="checkbox" name="" id="" />
              </th>
              <td>Proposta de marca</td>
              <td class="text-center">Hoje</td>
              <td class="text-center">
                <span class="badge text-bg-secondary">Concluído</span>
              </td>
              <td class="text-center">
                <span class="badge text-bg-danger">Alta</span>
              </td>
              <td class="text-center">
                <img src="../assets/images/pessoa3.jpg" alt="" />
              </td>
            </tr>
            <tr role="button">
              <th class="text-center" scope="row">
                <input type="checkbox" name="" id="" />
              </th>
              <td>Assinatura de contrato</td>
              <td class="text-center">Hoje</td>
              <td class="text-center">
                <span class="badge text-bg-secondary">Em andamento</span>
              </td>
              <td class="text-center">
                <span class="badge text-bg-warning">Média</span>
              </td>
              <td class="text-center">
                <img src="../assets/images/pessoa2.jpg" alt="" />
                <img src="../assets/images/pessoa3.jpg" alt="" />
              </td>
            </tr>
            <tr role="button">
              <th class="text-center" scope="row">
                <input type="checkbox" name="" id="" />
              </th>
              <td>Visão geral do mercado</td>
              <td class="text-center">Hoje</td>
              <td class="text-center">
                <span class="badge text-bg-secondary">Em andamento</span>
              </td>
              <td class="text-center">
                <span class="badge text-bg-danger">Alta</span>
              </td>
              <td class="text-center">
                <img src="../assets/images/pessoa1.jpg" alt="" />
              </td>
            </tr>
          </tbody>
        </table>
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
                <option value="Facil">Fácil</option>
                <option value="Media">Média</option>
                <option value="Dificil">Difícil</option>
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
            <div class="form-check me-0">
              <legend>Dificuldade</legend>
              <input class="form-check-input" type="radio" name="dificuldade" id="dificuldadeFacil"/>
              <label class="form-check-label" for="dificuldadeFacil">Fácil</label>
              <br>
              <input class="form-check-input" type="radio" name="dificuldade" id="dificuldadeMedia"/>
              <label class="form-check-label" for="dificuldadeMedia">Média</label>
              <br>
              <input class="form-check-input" type="radio" name="dificuldade" id="dificuldadeDificil"/>
              <label class="form-check-label" for="dificuldadeDificil">Difícil</label>
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

main table {
  padding: 1rem !important;
}

td img {
  width: 30px;
  height: 30px;
  object-fit: cover;
  border-radius: 50%;
}

input[type="checkbox"] {
  width: 15px;
  height: 15px;
}
</style>

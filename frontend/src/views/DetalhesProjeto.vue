<template>
  <div class="d-flex gap-3" style="height: 100vh;">
    <Aside/>
    <main class="w-100">
      <section class="dados-projeto d-flex flex-column gap-3">
        <div class="p-3 bg-white detalhe-projeto">
          <h2>Nome do projeto</h2>
        </div>
        <div class="p-3 bg-white detalhe-projeto">
          <h2>Pontuação total: <span>500pts</span></h2>
        </div>
        <div class="d-flex gap-3 mb-3">
          <div class="p-3 bg-white w-100 detalhe-projeto">
            <h2>Tarefas Pendentes</h2>
            <p>Quantidade</p>
          </div>
          <div class="p-3 bg-white w-100 detalhe-projeto">
            <h2>Tarefas em Andamento</h2>
            <p>Quantidade</p>
          </div>
          <div class="p-3 bg-white w-100 detalhe-projeto">
            <h2>Tarefas Concluídas</h2>
            <p>Quantidade</p>
          </div>
        </div>
      </section>
      <section class="d-flex gap-3">
        <div class="ranking w-50">
          <h2>Ranking do Grupo</h2>
          <div class="d-flex justify-content-between text-center">
            <div class="flex-column ">
              <img src="../assets/images/pessoa1.jpg" alt="">
              <p class="podio">Roberto</p>
              <div class="podio">
                <i></i>
                <p>110 Pontos</p>
              </div>
            </div>
            <div>
              <img src="../assets/images/pessoa6.jpg" alt="">
              <p class="podio">Carla</p>
              <div class="podio">
                <i></i>
                <p>110 Pontos</p>
              </div>
            </div>
            <div>
              <img src="../assets/images/pessoa3.jpg" alt="">
              <p class="podio">Nicolas</p>
              <div class="podio">
                <i></i>
                <p>110 Pontos</p>
              </div>
            </div>
          </div>
        </div>       
        <table class="table w-50 text-center rounded-4">
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
                <img src="../assets/images/pessoa1.jpg" alt="">
              </td>
              <td>Jessica Felicio</td>
              <td>79</td>
            </tr>
            <tr>
              <th scope="row">5</th>
              <td>
                <img src="../assets/images/pessoa2.jpg" alt="">
              </td>
              <td>Charles Etorome</td>
              <td>67</td>
            </tr>
            <tr>
              <th scope="row">6</th>
              <td>
                <img src="../assets/images/pessoa3.jpg" alt="">
              </td>
              <td>Nathan Anderson</td>
              <td>54</td>
            </tr>
            <tr>
              <th scope="row">7</th>
              <td>
                <img src="../assets/images/pessoa4.jpg" alt="">
              </td>
              <td>Matthew Hamilton</td>
              <td>52</td>
            </tr>
            <tr>
              <th scope="row">8</th>
              <td>
                <img src="../assets/images/pessoa5.jpg" alt="">
              </td>
              <td>Brooke Cagle</td>
              <td>49</td>
            </tr>
            <tr>
              <th scope="row">9</th>
              <td>
                <img src="../assets/images/pessoa6.jpg" alt="">
              </td>
              <td>Ivana Cajina</td>
              <td>47</td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  </div>
</template>
  
<script setup>
import Aside from '@/components/Aside.vue';
</script>
  
<style scoped>
.detalhe-projeto, table {
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.171);
}

.dados-projeto h2 {
  font-size: 20px;
}

.ranking img {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid black;
}

table img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
}

.podio {
  background-color: var(--azul);
  margin-top: 1rem;
  border-radius: .25rem;
} 
</style>
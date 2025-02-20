<template>
  <aside class="bg-white w-auto d-inline-block h-100">
    <nav>
      <ul class="d-flex flex-column justify-content-between">
        <div>
          <li class="li-border">
            <i class="bi bi-list fs-2"></i>
            <router-link to="/" class="text-decoration-none">
              <h1>QualiGest</h1>
            </router-link>
          </li>
          <router-Link to="/projetos" class="li-border" :class="{ 'li-ativo': $route.path == '/projetos' }">
            <i class="bi bi-stack"></i>
            <span>Projetos</span>
          </router-Link>
          <router-Link to="/lista-tarefas" class="li-border" :class="{ 'li-ativo': $route.path == '/lista-tarefas' }">
            <i class="bi bi-check-circle-fill"></i>
            <span>Tarefas</span>
          </router-Link>
          <router-Link to="/detalhes-projeto" class="li-border" :class="{ 'li-ativo': $route.path == '/detalhes-projeto' }">
            <i class="bi bi-info-circle-fill"></i>
            <span>Detalhes do projeto</span>
          </router-Link>
          <router-Link to="/perfil" class="li-border" :class="{ 'li-ativo': $route.path == '/perfil' }">
            <i class="bi bi-person-circle"></i>
            <span>Perfil</span>
          </router-Link>
        </div>
        <router-Link to="/" class="li-border-logout">
          <i class="bi bi-box-arrow-right"></i>
          <span>Sair</span>
        </router-Link>
      </ul>
    </nav>
  </aside>
</template>

<script setup>

</script>

<style scoped>
aside {
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.171);
  min-width: 250px;
}

ul {
  height: 100vh;
  padding: 0;
  margin: 0;
}

.li-border, .li-border-logout {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 2rem;
  width: 100%;
  text-decoration: none;
  color: black;
}

.li-border{
  border-bottom: 2px solid var(--cinza-claro);  
}

.li-border-logout {
  border-top: 2px solid var(--cinza-claro);
}

h1 {
  font-size: 24px;
  color: var(--amarelo);
  margin: 0;
}

.bi {
  color: var(--amarelo);
  font-size: 20px;
}

.li-ativo {
  box-shadow: 0 -5px 5px rgba(0, 0, 0, 0.100),
              0 5px 5px rgba(0, 0, 0, 0.100);
  border-left: 5px solid var(--amarelo);
}
</style>

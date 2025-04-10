import DetalhesProjeto from "@/views/DetalhesProjeto.vue"
import ListaTarefas from "@/views/ListaTarefas.vue";
import PaginaInicial from "@/views/PaginaInicial.vue"
import Perfil from "@/views/Perfil.vue";
import Projetos from "@/views/Projetos.vue";
import { createRouter, createWebHistory } from "vue-router"

const routes = [
    { path: "/", component: PaginaInicial },
    { path: "/detalhes-projeto", component: DetalhesProjeto },
    { path: "/perfil", component: Perfil },
    { path: "/lista-tarefas", component: ListaTarefas },
    { path: "/projetos", component: Projetos }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
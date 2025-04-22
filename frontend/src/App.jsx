import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PaginaInicial from './pages/PaginaInicial/PaginaInicial';
import Perfil from './pages/Perfil/Perfil';
import Projetos from './pages/Projetos/Projetos';
import DetalhesProjeto from './pages/DetalhesProjeto/DetalhesProjeto';
import ListaTarefas from './pages/ListaTarefas/ListaTarefas';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <PaginaInicial/> }/>
        <Route path='/perfil' element={ <Perfil/> }/>
        <Route path='/lista-tarefas' element={ <ListaTarefas/> }/>
        <Route path='/detalhes-projeto' element={ <DetalhesProjeto/> }/>
        <Route path='/projetos' element={ <Projetos/> }/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
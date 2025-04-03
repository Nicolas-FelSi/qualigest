import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PaginaInicial from './pages/PaginaInicial';
import DetalhesProjeto from './pages/DetalhesProjeto';
import ListaTarefas from './pages/ListaTarefas';
import Perfil from './pages/Perfil';
import Projetos from './pages/Projetos';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <PaginaInicial/> } />
        <Route path='/detalhes-projeto' element={ <DetalhesProjeto/> } />
        <Route path='/lista-tarefas' element={ <ListaTarefas/> } />
        <Route path='/perfil' element={ <Perfil/> } />
        <Route path='/projetos' element={ <Projetos/> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PaginaInicial from './pages/PaginaInicial/PaginaInicial';
import Perfil from './pages/Perfil/Perfil';
import Projetos from './pages/Projetos/Projetos';
import DetalhesProjeto from './pages/DetalhesProjeto/DetalhesProjeto';
import ListaTarefas from './pages/ListaTarefas/ListaTarefas';
import { ToastContainer } from 'react-toastify';

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
      <ToastContainer/>
    </BrowserRouter>
  )
}

export default App;
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PaginaInicial from './pages/PaginaInicial';
import Perfil from './pages/Perfil';
import Projetos from './pages/Projetos';
import DetalhesProjeto from './pages/DetalhesProjeto';
import ListaTarefas from './pages/ListaTarefas';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <PaginaInicial/> }/>
        <Route path='/perfil' element={ <Perfil/> }/>
        <Route path='/lista-tarefas/:idProjeto' element={ <ListaTarefas/> }/>
        <Route path='/detalhes-projeto/:idProjeto' element={ <DetalhesProjeto/> }/>
        <Route path='/projetos' element={ <Projetos/> }/>
      </Routes>
      <ToastContainer/>
    </BrowserRouter>
  )
}

export default App;
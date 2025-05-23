import ModalLogin from "../components/Modais/ModalLogin";
import ModalCadastro from "../components/Modais/ModalCadastro";
import Card from "../components/PaginaInicial/Card"
import Button from "../components/PaginaInicial/Button"
import MobileMenu from "../components/PaginaInicial/MobileMenu"
import { useState } from "react";

function PaginaInicial() {
  const [modalState, setModalState] = useState({
    login: false,
    cadastro: false,
    menu: false,
  });

  const toggleModal = (modal) => {
    setModalState((prev) => ({ ...prev, [modal]: !prev[modal] }));
  };

  return (
    <div>
      <header className="bg-white flex justify-between items-center p-3 px-6 shadow-md">
        <h1 className="text-3xl lg:text-4xl font-semibold text-amber-600">
          Qualigest
        </h1>
        <nav className="hidden sm:flex sm:justify-between gap-6">
          <Button children={"Entrar"} onClick={() => toggleModal("login")}/>
          <Button children={"Cadastrar"} onClick={() => toggleModal("cadastro")}/>
        </nav>
        <MobileMenu 
          isOpen={modalState.menu}
          onOpenCadastro={() => toggleModal("cadastro")}
          onOpenLogin={() => toggleModal("login")}
          onToggle={() => toggleModal("menu")} 
        />
      </header>
      <main className="flex items-center flex-col py-6 p-2">
        <h2 className="text-amber-600 text-2xl lg:text-3xl font-semibold">
          Bem-vindo ao QualiGest
        </h2>
        <p className="font-semibold text-lg text-center pt-4">
          Gerencie suas tarefas com eficiência e colaboração
        </p>
        <div className="py-12">
          <img src="/images/equipe-tarefa.png" alt="" />
        </div>
        <div className="grid gap-4 justify-center md:grid-cols-3 mx-2">
          <Card 
            description={"Organize suas tarefas de acordo com a prioridade e prazo"} 
            imageAlt={"Ícone de priorização de tarefas"} 
            imageSrc={"/images/tarefas.webp"} 
            title={"Priorização de tarefas"} 
            widthImage={"150px"}
          />
          <Card 
            description={"Acompanhe os prazos de cada projeto com facilidade"} 
            imageAlt={"Ícone de priorização de tarefas"} 
            imageSrc={"/images/prazo.png"} 
            title={"Gerenciamento de Prazos"} 
            widthImage={"100px"}
          />
          <Card 
            description={"Trabalhe em conjunto atribuindo responsabilidades"} 
            imageAlt={"Ícone de priorização de tarefas"} 
            imageSrc={"/images/equipe.png"} 
            title={"Colaboração em Equipe"} 
            widthImage={"150px"}
          />
        </div>
      </main>

      <ModalLogin
        isOpen={modalState.login}
        closeModal={() => toggleModal("login")}
        openModalCadastro={() => toggleModal("cadastro")}
      />
      <ModalCadastro
        isOpen={modalState.cadastro}
        closeModal={() => toggleModal("cadastro")}
        openModalLogin={() => toggleModal("login")}
      />
    </div>
  );
}

export default PaginaInicial;

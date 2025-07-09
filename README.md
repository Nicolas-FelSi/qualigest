<h1>QualiGest</h1>




<!-- https://docs.google.com/presentation/d/1Tmyn8OJSw1Zd6TwBF2gAuUL0KEB5muQr/edit?slide=id.g2d725bba5ac_0_73#slide=id.g2d725bba5ac_0_73 -->

<!-- https://docs.google.com/spreadsheets/d/1D5EHew6gX-f26Q5cVADv6qd53XHDOAdPPzPaC5gxF_4/edit?gid=505199366#gid=505199366 -->  



<p align="center">
  <img src="https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white"/>
  <img src="https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white"/>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>
  <img src="https://img.shields.io/badge/VSCode-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white"/>
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white"/>
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white"/>
</p>

> Status do Projeto: :warning: em desenvolvimento

### Tópicos 

:small_blue_diamond: [Descrição do projeto](#descrição-do-projeto)

:small_blue_diamond: [Funcionalidades](#funcionalidades)

:small_blue_diamond: [Pré-requisitos](#pré-requisitos-books)

:small_blue_diamond: [Como rodar a aplicação](#como-rodar-a-aplicação-arrow_forward)

## Descrição do projeto 

<p align="justify">
    A Qualigest é uma plataforma web de gerenciamento de equipes e projetos desenvolvida para melhorar a eficiência e o controle de entregas. Seu grande diferencial é um sistema de pontuação que avalia o cumprimento dos prazos do trabalho realizado. Essa abordagem permite que gestores acompanhem de forma mais precisa o desempenho das equipes, reconhecendo o esforço e incentivando melhorias contínuas. Além disso, a Qualigest oferece uma interface moderna e funcionalidades personalizáveis, ajudando empresas a otimizar a produtividade dos resultados de seus projetos.
</p>

## Funcionalidades

🚧 O sistema deve permitir que o usuário crie projetos;

🚧 O sistema deve calcular a pontuação do usuário de acordo com o tempo da entrega;
  
🚧 O sistema deve permitir que o organizador adicione participantes no projeto;

🚧 O sistema deve permitir que o organizador gerencie tarefas;

🚧 O organizador deve ser capaz de atribuir um ou mais responsáveis para cada tarefa criada;

🚧 O sistema deve permitir que os responsáveis por uma tarefa marquem-na como concluída, registrando a data de entrega;

🚧 Os usuários devem ter acesso a informações do projeto, como tarefas pendentes, concluídas, e o ranking dos participantes por ponto no projeto;

🚧 O sistema deve manter atualizadas as informações exibidas na tela de detalhes do projeto.



<!-- <span style="color: red;">Liste todas as linguagens, dependencias e libs que o usuário deve ter instalado na máquina antes de rodar a aplicação</span> -->

## Pré-requisitos :books:

- Node.js (versão 18 ou superior) instalado
- XAMPP instalado
- Git

## Como rodar a aplicação :arrow_forward:
Este projeto utiliza ReactJS com Vite para o frontend e PHP puro com XAMPP para o backend. Siga os passos abaixo para configurar e executar o projeto localmente.

No terminal, clone o projeto: 

```
git clone https://github.com/Nicolas-FelSi/qualigest.git
cd qualigest
code .
```

### Configurar o Backend (PHP com XAMPP):

- Inicie o XAMPP e ative os módulos Apache e MySQL.

- Copie a pasta do projeto para a pasta htdocs do XAMPP (exemplo: C:\xampp\htdocs\).

- Acesse http://localhost/phpmyadmin.

- Importe o arquivo SQL (que está na raiz do projeto) no phpMyAdmin:

- Importe o arquivo .sql na aba "Importar".

- Após importar é recomendado ativar os eventos do banco de dados, para ativar selecione o banco de dados, vá na aba eventos e precione o botão em Status do agendador de eventos para ativar.

- Verifique se as configurações de conexão com o banco (ex.: host, user, password, database) estão corretas no arquivo de configuração do PHP (backend/config/database.php).


### Configurar o Frontend (ReactJs com Vite):

- Todo o processo abaixo será realizado dentro da pasta frontend, navegue até a pasta do frontend:
```
cd frontend
```
- Crie um arquivo chamado ".env" e dentro dele coloque esse comando: VITE_PORT_BACKEND = numero_da_porta_apache. Exemplo:
```
VITE_PORT_BACKEND = 8080
```
- Abra o terminal e instale as dependências:
```
npm install
```
- Ainda no terminal, inicie o servidor de desenvolvimento do Vite:
```
npm run dev
```
- O frontend estará disponível em http://localhost:5173 (ou outra porta indicada no terminal).

## Desenvolvedores e Contribuintes :octocat:

Equipe responsável pelo desenvolvimento do projeto

| [<img src="https://avatars.githubusercontent.com/u/149525930?v=4" width=115><br><sub>Gabriel</sub>](https://github.com/B41el) |  [<img src="https://avatars.githubusercontent.com/u/56174366?v=4" width=115><br><sub>Nicolas</sub>](https://github.com/Nicolas-FelSi) |  [<img src="" width=115><br><sub>Alexandre</sub>]()  |
| :---: | :---: | :---: |

## Licença 

The [MIT License]() (MIT)

Copyright :copyright: 2025 - QualiGest
